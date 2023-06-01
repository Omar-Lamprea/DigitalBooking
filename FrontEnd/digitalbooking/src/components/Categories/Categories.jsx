import CategoryCard from "../CategoryCard/CategoryCard";
// import categories from "../../utils/categories.constants"; 
import Carousel from "../Carousel/Carousel";
import { useContextGlobal } from "../../context/global.context";

const Categories = () => {
  
  const {state} = useContextGlobal();
  const categories = state.categories;

  return (
    <section className="categories__container container">
      <h3>Buscar por tipo de alojamiento</h3>
      <div className="categories__content categories__content-desktop">
        {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
      </div>
      <div className="categories__content-tablet" style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}>
        <Carousel show={2}>
          {categories && categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
        </Carousel>
      </div>
      <div className="categories__content-mobile" style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}>
        <Carousel show={1}>
          {categories && categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Categories