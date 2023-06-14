import Card from 'react-bootstrap/Card';
import { useContextGlobal } from '../../context/global.context';
import PropTypes from 'prop-types';

const CategoryCard = ({category}) => {
  const {state, dispatch} = useContextGlobal()

  // const [category, serCategory] = useState();
  const handleCardClick = async () => {
    try {
      const response = await fetch(
        state.URL_API.urlBase + 
        state.URL_API.product + 
        state.URL_API.productByCategory + 
        category.categoryId
      )
      const data = await response.json()
      if(response.ok){
        dispatch({type: "titleProducts", payload: category.name})
        dispatch({type: "setProducts"})
        dispatch({type: "APIdata", payload: data})
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }


    return (
      <div className="card__container">
        <Card className="card__wrapper" onClick={handleCardClick}>
          <Card.Img className="card__img" variant="top" src={category.imageUrl} />
          <Card.Body className="card__body">
            <Card.Title className="card__title">{category.name}</Card.Title>
            {/* <Card.Text className="card__text">{category.name}</Card.Text> */}
          </Card.Body>
        </Card>
      </div>
    );
    
};

export default CategoryCard;


CategoryCard.propTypes = {
  category: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired
  }).isRequired,
};