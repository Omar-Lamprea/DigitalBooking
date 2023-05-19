import './SearchBar.scss'

const SearchBar = () => {

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  return (
    <section className="search-bar">
      <div className="bg-bar">
        <h1>Busca ofertas en hoteles, casas y mucho más!</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          <div className="input-form location">
            <label htmlFor="location-form">
              <i className="fa-solid fa-location-dot"></i>
            </label>
            <input type="text" name="location-form" id="location-form" placeholder='¿A dónde vamos?'/>
          </div>
          <div className="input-form date">
            <label htmlFor="date-form">
              <i className="fa-solid fa-calendar-days"></i>
            </label>
            <input type="date" name="date-form" id="date-form" placeholder='chek in'/>
          </div>
          <button className='search-button'>Buscar</button>
        </form>
      </div>
    </section>
  )
}

export default SearchBar