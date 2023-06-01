import CategoryCard from "../CategoryCard/CategoryCard";
import categories from "../../utils/categories.constants"; 

const Categories = () => {
  return (
    <section className="categories__container container">
      <h3>Buscar por tipo de alojamiento</h3>
      <div className="categories__content d-flex">
        {categories.map(( category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
      </div>
    </section>
  );
};

export default Categories