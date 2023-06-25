import { useEffect, useState } from 'react'
import './SearchBar.scss'
import DatePicker from "react-multi-date-picker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useContextGlobal } from '../../context/global.context';


const SearchBar = () => {
  const {state, dispatch} = useContextGlobal()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 620);
  const [cityList, setCityList] = useState(false)
  const [getCityList, setGetCityList] = useState(false)
  const [searchProduct, setSearchProduct] = useState({
    city: "",
    date: [],
    latitude: "",
    longitude: ""
  })

  const requestLocationPermission = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({
            latitude: latitude,
            longitude: longitude
          });
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchButton = e.target.elements.searchButton;
      searchButton.disabled = true;
      searchButton.style.cursor = 'progress';
      
      if (navigator.geolocation) {
        const location = await requestLocationPermission();
        const jsonBody = templateNormalized(searchProduct, location);
        
        try {
          const response = await fetch(
            state.URL_API.urlBase + 
            state.URL_API.product + 
            `?lat=${jsonBody.latitude}&lon=${jsonBody.longitude}&city=${jsonBody.city}&checkInDate=${jsonBody.date[0]}&checkOutDate=${jsonBody.date[1]}`
          )
          const data = await response.json()
          if(response.ok){
            dispatch({type: "titleProducts", payload: `Alojamientos en ${jsonBody.city}`})
            dispatch({type: "setProducts"})
            dispatch({type: "APIdata", payload: data})
            dispatch({type: "setBookingDates", payload: jsonBody.date})
            
            const productListElement = document.getElementById('suggestions-container');
            if (productListElement) {
              const navbarHeight = 100;
              const elementPosition = productListElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition - navbarHeight;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }

          }
        } catch (error) {
          console.log('error en la búsqueda: ', error);
        }
        
        searchButton.disabled = false;
        searchButton.style.cursor = 'auto';
      }else{
        alert('Necesitamos permisos para acceder a tu ubicacion para realizar esta búsqueda')
      }
    } catch (error) {
      console.error(error);
    }
  };


  const templateNormalized = (data, location) => {
    const template = {
      city: data.city,
      date: [],
      latitude: location.latitude,
      longitude: location.longitude
    }
    data.date.forEach((date) =>{
      const originalDate = new Date(date)
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); 
      const day = originalDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      template.date.push(formattedDate)
    })
    return template
  }

  const handleCities = async() =>{
    setCityList(true)
    if(!getCityList){
      try {
        const response = await fetch(state.URL_API.urlBase + state.URL_API.citiesAll)
        const data = await response.json()
        setGetCityList(data)
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleInputCity = (e) =>{
    const input = document.getElementById('city')
    setSearchProduct({...searchProduct, city: e.target.dataset.id})
    input.value = e.target.dataset.id
    setCityList(false)
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
              onFocus={handleCities}
              onBlur={() => setTimeout(() => {setCityList(false)}, 100)}
              autoComplete="off"
              required
            />

            {cityList && 
              <div className="cityList">
                <ul>
                  {getCityList &&
                    getCityList.map((city, i) => 
                      <li key={i} data-id={city.name} onClick={handleInputCity}>
                        <FontAwesomeIcon icon={faLocationDot} style={{color:"#14347c"}}/>
                        <p data-id={city.name} className='text-start'><strong data-id={city.name}>{city.name}</strong> <br /> {city.country.name}</p>
                      </li>
                    )
                  }
                </ul>
              </div>
            }
          </div>
          <div className="input-form date">
            <label htmlFor="date">
              <FontAwesomeIcon icon={faCalendarDays} />
            </label>
            {/* <input value={searchProduct.date} type="date" name="date" id="date" onChange={handleOnChange}/> */}
            <DatePicker
              required
              name='date'
              range 
              dateSeparator=" - "
              placeholder='Busca por fecha'
              numberOfMonths={isSmallScreen ? 1 : 2}
              
              mapDays={({ date }) => {
                const currentDate = new Date();
                
                if (date < currentDate) 
                return {
                  disabled: true,
                  style: { color: "#ccc" },
                }
              }}

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