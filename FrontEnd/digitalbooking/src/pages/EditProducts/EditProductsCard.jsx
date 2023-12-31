import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ModalDeleteProduct from '../../components/Modals/ModalDeleteProduct';
import { Link } from 'react-router-dom';
const EditProductsCard = ({data}) => {
  const priceFormated = parseFloat(data.price).toLocaleString({ minimumFractionDigits: 0 })
  return (
    <section className='product'>
      <div className="product-img">
        <Link to={"../../producto/" + data.productId}>
          <img src={data?.images[0]?.url} alt="product image" />
        </Link>
      </div>
      <div className="product-data">
        <p>Nombre: <br />
          <span>{data.name}</span>
        </p>
        <p>Ubicación: <br />
          <span>{data?.city?.name} / {data?.city?.country?.name}</span>
        </p>
        <p>Precio: <br />
          <span>${priceFormated}</span>
        </p>
        <p>Categoría: <br />
          <span>{data.category.name}</span>
        </p>
      </div>
      <div className="product-actions">
        {/* <div className="edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div> */}
        <div className="delete">
          <ModalDeleteProduct id={data.productId} productName={data.name}/>
        </div>
      </div>
    </section>
  )
}

export default EditProductsCard


EditProductsCard.propTypes = {
  data: PropTypes.object.isRequired,
};