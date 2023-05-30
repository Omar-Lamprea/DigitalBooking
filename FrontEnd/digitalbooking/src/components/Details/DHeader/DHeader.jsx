import { faAngleLeft, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './DHeader.scss'
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"

const DHeader = ({data}) => {
  const navigate = useNavigate()
  const scoreStars = () =>{
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if(data.score >= i){
        stars.push(<FontAwesomeIcon icon={faStar}  key={"star-" + i}/>)
      }else{
        stars.push(<FontAwesomeIcon icon={faStar} key={"star-" + i} style={{color:"gray"}}/>)
      }
    }
    return stars
  }
  return (
    <section className="DHeader">
      <div className="conteiner-header blue">
        <div className="title">
          <p>{data.category}</p>
          <h3>{data.name}</h3>
        </div>
        <div className="back" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      </div>
      <div className="conteiner-header gray">
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{data.city}</span>
        </div>
        <div className="score">
          <div className="stars">
            {scoreStars()}
          </div>
          <span className="number">{data.score}</span>
        </div>
      </div>
    </section>
  )
}

export default DHeader

DHeader.propTypes = {
  data: PropTypes.object.isRequired,
}