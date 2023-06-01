import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
const CategoryCard = ({category}) => {

  // const [category, serCategory] = useState();
  const handleCardClick = () => {
    console.log('click card');
  };


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
