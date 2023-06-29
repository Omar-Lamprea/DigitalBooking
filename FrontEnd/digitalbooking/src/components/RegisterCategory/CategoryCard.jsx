import PropTypes from 'prop-types';
import ModalDeleteCategory from '../Modals/ModalDeleteCategory';

const CategoryCard = ({data}) => {
  return (
    <section className='category'>
      <div className="category-img">
        <img src={data.imageUrl} alt="category image" />
      </div>
      <div className="category-data">
        <p>Nombre: <br />
          <span>{data.name}</span>
        </p>
        <p>Descripción: <br />
          <span>{data.description}</span>
        </p>
      </div>
      <div className="category-actions">
        {/* <div className="edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div> */}
        <div className="delete">
          <ModalDeleteCategory id={data.categoryId} categoryName={data.name}/>
        </div>
      </div>
    </section>
  )
}

export default CategoryCard


CategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};