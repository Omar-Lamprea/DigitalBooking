import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

const ModalShowProductImages = (props) => {
  return (
    <>
      {props.images &&
        <Modal {...props}
          className='modal-images'
          size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
          <Carousel>
            {props.images.map ((image, i) => 
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt="product-image"/>
              </Carousel.Item>)
            }
        </Carousel>
          </Modal.Body>
        </Modal>
      }
    </>
  )
}

export default ModalShowProductImages

ModalShowProductImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};