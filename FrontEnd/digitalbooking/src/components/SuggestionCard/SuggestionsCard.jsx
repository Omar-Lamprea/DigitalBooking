import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const SuggestionCard = ({suggestion}) => {
    return(
      <div className="suggestion-card__container">
        <div className="suggestion-card__wrapper">
            {suggestion && suggestion.images.map((img, index) => {
                if (index === 0) {
                    return (<div className="suggestion-card__image" key={index} style={{backgroundImage: `url(${img.url})`}}></div>)
                }}
            )}
            <div className="suggestion-card__information">
                <div className="suggestion-card__title-rank">
                    <div className="suggestion-card__rank">
                        <div>
                            <span className="suggestion-card__rank-title">{suggestion.category.name}</span>
                            <span className="suggestion-card__rank-icons">
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <i className="fa-sharp fa-solid fa-star"></i>
                            </span>
                        </div>
                        <span className="suggestion-card__counter">{suggestion.score}</span>
                    </div>
                    <div className="suggestion-card__title">
                        <h4>{suggestion.name}</h4>
                        <span>{suggestion.city?.name}</span>
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
                    <p>{suggestion.description}</p>
                </div>
                <Link to={`producto/${suggestion.productId}`} className="w-100 button button__primary suggestion-card__link">Ver más</Link>
            </div>
        </div>
      </div>
    )
};

SuggestionCard.propTypes = {
    suggestion: PropTypes.shape({
        images: PropTypes.array.isRequired,
        productId: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        city: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        category: PropTypes.object.isRequired,
    }).isRequired,
}

export default SuggestionCard;