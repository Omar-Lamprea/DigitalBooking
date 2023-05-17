import Card from 'react-bootstrap/Card';
// import '../../styles/components/CategoryCard.scss';

const CategoryCard = () => {
    
    return (
      <div className="card__container">
        <Card className="card__wrapper">
          <Card.Img className="card__img" variant="top" src="./src/assets/images/category-1.png" />
          <Card.Body className="card__body">
            <Card.Title className="card__title">Hoteles</Card.Title>
            <Card.Text className="card__text">807.105 hoteles</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
    
};

export default CategoryCard;
