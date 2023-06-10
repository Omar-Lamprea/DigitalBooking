import { useEffect, useState } from 'react'
import './SearchBar.scss'
import DatePicker from "react-multi-date-picker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 620);
  const [searchProduct, setSearchProduct] = useState({
    city: "",
    date: []
  })


  const handleSubmit = (e) =>{
    e.preventDefault()
    if(validateForm()){
      const searchButton = e.target.elements.searchButton;
      searchButton.disabled = true;
      searchButton.style.cursor = 'progress';
      
      setTimeout(() => {
        const jsonBody = templateNormalized(searchProduct)
        console.log(jsonBody);
        searchButton.disabled = false;
        searchButton.style.cursor = 'auto';
      }, 1000);

    }
  }

  const validateForm = () =>{
    return true
  }

  const templateNormalized = (data) => {
    const template = {
      city: data.city,
      date: []
    }
    data.date.forEach((date) =>
      template.date.push(new Date(date).toISOString()))
    return template
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 620);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isSmallScreen]);

  return (
    <section className="search-bar">
      <div className="bg-bar">
        <h1>Busca ofertas en hoteles, casas y mucho más!</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          <div className="input-form location">
            <label htmlFor="city">
              <FontAwesomeIcon icon={faLocationDot} />
            </label>
            <input 
              // value={searchProduct.city} 
              type="text" 
              name="city" 
              id="city"
              placeholder='¿A dónde vamos?' 
              onChange={city => setSearchProduct({...searchProduct, city: city.target.value})} 
              required/>
          </div>
          <div className="input-form date">
            <label htmlFor="date">
              <FontAwesomeIcon icon={faCalendarDays} />
            </label>
            {/* <input value={searchProduct.date} type="date" name="date" id="date" onChange={handleOnChange}/> */}
            <DatePicker 
              name='date'
              range 
              dateSeparator=" - "
              numberOfMonths={isSmallScreen ? 1 : 2}
              onChange={dates => setSearchProduct({...searchProduct, date: dates})}
            />
          </div>
          <button className='search-button' name="searchButton">Buscar</button>
        </form>
      </div>
    </section>
  )
}

export default SearchBar