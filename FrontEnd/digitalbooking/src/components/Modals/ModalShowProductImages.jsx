import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

const ModalShowProductImages = (props) => {

  return (
    <>
      {props.images &&
        <Modal {...props}
          size="lg"
          centered
          className='modal-main'
        >
          <Modal.Body>
            <Carousel>
              {props.images.map ((image, i) => 
                <Carousel.Item key={i} className='modal-item-img'>
                  <img
                    className="d-block w-100"
                    src={image.url}
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
  images: PropTypes.array.isRequired,
};