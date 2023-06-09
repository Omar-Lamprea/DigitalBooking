import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faTv, faCar, faUtensils, faPaw, faWind } from '@fortawesome/free-solid-svg-icons';

import { useContextGlobal } from "../../../context/global.context";
import PropTypes from 'prop-types';

const DDescription = ({lodging}) => {

  const {state} = useContextGlobal
  const amenityMappings = {
    wifi: {
      icon: faWifi,
      translation: 'Wifi',
    },
    tv: {
      icon: faTv,
      translation: 'TV',
    },
    parkingLot: {
      icon: faCar,
      translation: 'Estacionamiento',
    },
    kitchen: {
      icon: faUtensils,
      translation: 'Cocina',
    },
    pet: {
      icon: faPaw,
      translation: 'Apto Mascotas',
    },
    airConditioning: {
      icon: faWind,
      translation: 'Aire Acondicionado',
    },
  }

  const amenitiesNormalized = () => {
    const filteredAmenities = lodging.amenities
      .filter((amenity) => amenity.available === true)
      .map((amenity) => ({
        ...amenity,
        ...amenityMappings[amenity.name],
      }))
    return filteredAmenities
  }
  
  const descriptionNomalized = () => {
    const text = lodging.description 
      ? lodging.description.replaceAll('\n', "<br />") 
      : ""
    return { __html: text }
  }

  return (
    <section className="info-container">
      <div className="description_container">
        <div className="description-text">
          <h3>{lodging.name} - {lodging.city}</h3>
          <hr />
          <p 
            className="mt-3 mt-lg-0 text-start w-100"
            dangerouslySetInnerHTML={descriptionNomalized()}>
          </p>
        </div>

        <div className="container_icons d-flex flex-column">
          <span>
            <h3>¿Qué ofrece este lugar?</h3>
            <hr />
            <ul className="column-list">
            {amenitiesNormalized().map((amenity) => (
              <li key={amenity.amenityId}>
                {amenity.icon && <FontAwesomeIcon icon={amenity.icon} />}
                <span>{amenity.translation}</span>
              </li>
            ))}
            </ul>
          </span>
          {state?.user?.data && 
            <button>Reserva ahora! </button>
          }
        </div>
      </div>
    </section>
  );
}

export default DDescription

DDescription.propTypes = {
  lodging: PropTypes.object.isRequired,
}