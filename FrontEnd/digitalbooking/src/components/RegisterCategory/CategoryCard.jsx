import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
// import ModalDeleteProduct from '../../components/Modals/ModalDeleteProduct';

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
          <span>{data.description} / {data.country}</span>
        </p>
      </div>
      <div className="category-actions">
        {/* <div className="edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div> */}
        <div className="delete">
          {/* <ModalDeleteProduct id={data.id}/> */}
        </div>
      </div>
    </section>
  )
}

export default CategoryCard


CategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};