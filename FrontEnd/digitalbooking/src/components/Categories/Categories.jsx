import CategoryCard from "../CategoryCard/CategoryCard";

const Categories = () => {
  return (
    <section className="categories__container container">
      <h3>Buscar por tipo de alojamiento</h3>
      <div className="categories__content d-flex">
        {Array(4).fill(<CategoryCard />)}
      </div>
    </section>
  );
};

export default Categories