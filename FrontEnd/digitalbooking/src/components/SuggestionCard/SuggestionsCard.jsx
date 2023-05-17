const SuggestionCard = () => {
    return(
      <div className="suggestion-card__container">
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
              <div className="suggestion-card__location"></div>
              <div className="suggestion-card__description"></div>
              <button className="">Ver más</button>
          </div>

      </div>
    )
};

export default SuggestionCard;