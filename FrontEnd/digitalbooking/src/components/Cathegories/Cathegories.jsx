import CategoryCard from "../CategoryCard/CategoryCard";


const Cathegories = () => {
    return( 
      <div className="categories-container">
        <h3>Buscar por tipo de alojamiento</h3>
        {Array(4).fill(<CategoryCard />)}
      </div>
    );
};

export default Cathegories