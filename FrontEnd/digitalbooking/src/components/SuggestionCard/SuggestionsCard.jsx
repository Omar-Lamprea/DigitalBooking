const SuggestionCard = () => {
    return(
      <div className="suggestion-card__container">
        <div className="suggestion-card__wrapper">
            <div className="suggestion-card__image">
                {/* <img src="./src/assets/images/suggestion-1.png" alt="Suggestion-image" /> */}
            </div>
            <div className="suggestion-card__information">
                <div className="suggestion-card__title-rank">
                    <div className="suggestion-card__rank">
                        <div>
                            <span className="suggestion-card__rank-title">HOTEL</span>
                            <span className="suggestion-card__rank-icons">
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                            </span>
                        </div>
                        <span className="suggestion-card__counter">8</span>
                    </div>
                    <div className="suggestion-card__title">
                        <h4>Hermitage Hotel</h4>
                        <span>Bogotá</span>
                    </div>
                </div>
                <div className="suggestion-card__location">
                    <i className="fa-solid fa-location-dot"></i>
                    <a href="#" className="suggestion-card__location-see-map">VER EN MAPS</a>
                    <div className="suggestion-card__ammenities">
                    <i className="fa-solid fa-wifi"></i>
                    <i className="fa-sharp fa-solid fa-person-swimming"></i>
                    </div>
                </div>
                <div className="suggestion-card__description">
                    <p>En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2...</p>
                </div>
                <button className="w-100 button button__primary">Ver más</button>
            </div>
        </div>
      </div>
    )
};

export default SuggestionCard;