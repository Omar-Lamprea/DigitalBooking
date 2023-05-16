import CategoryCard from "../CategoryCard/CategoryCard";
// import '../../styles/components/Categories.scss';


const Categories = () => {
    return( 
      <div className="categories__container container">
        <h3>Buscar por tipo de alojamiento</h3>
        <div className="categories__content d-flex">
          {Array(4).fill(<CategoryCard />)}
        </div>
      </div>
    );
};

export default Categories