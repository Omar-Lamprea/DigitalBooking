import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
const CategoryCard = ({category}) => {

  // const [category, serCategory] = useState();
    
    return (
      <div className="card__container">
        <Card className="card__wrapper">
          <Card.Img className="card__img" variant="top" src="./src/assets/images/category-1.png" />
          <Card.Body className="card__body">
            <Card.Title className="card__title">{category.name}</Card.Title>
            <Card.Text className="card__text">807.105 {category.name}s</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
    
};

export default CategoryCard;
