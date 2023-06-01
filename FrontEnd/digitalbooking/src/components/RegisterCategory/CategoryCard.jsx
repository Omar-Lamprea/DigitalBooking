import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ModalDeleteProduct from '../../components/Modals/ModalDeleteProduct';
// import { Link } from 'react-router-dom';

const CategoryCard = ({data}) => {
  return (
    <section className='category'>
      <div className="category-img">
        <img src={data.imagen} alt="category image" />
        {/* <Link to={"../../producto/" + data.idProduct}>
          <img src={data.imagesURLs[0]} alt="product image" />
        </Link> */}
      </div>
      <div className="category-data">
        <p>Nombre: <br />
          <span>{data.nombre}</span>
        </p>
        <p  className='prueba'>Descripción: <br />
          <span>{data.descripcion} / {data.country}</span>
        </p>
      </div>
      <div className="category-actions">
        {/* <div className="edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div> */}
        <div className="delete">
          <ModalDeleteProduct id={data.id}/>
        </div>
      </div>
    </section>
  )
}

export default CategoryCard


CategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};