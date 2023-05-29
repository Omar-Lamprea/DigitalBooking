import { useState } from "react";
import ModalShowProductImages from "../../Modals/ModalShowProductImages";
import Button from 'react-bootstrap/Button';


const ContainerImg = (data) => {
  const images = data.images
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      {images &&
        <section className="container-images">
          <div className="main-image">
            <img src={images[0]} alt="" />
          </div>
          <div className="second-images">
            <img src={images[1] || images[0]} alt=""  className=""/>
            <img src={images[1] || images[0]} alt=""  className=""/>
            <img src={images[1] || images[0]} alt=""  className=""/>
            <img src={images[1] || images[0]} alt=""  className=""/>
            <Button 
              className="btn-modal-images" 
              onClick={() => setModalShow(true)}>
              Ver más!
            </Button>
          </div>
          <ModalShowProductImages
            images={images}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </section>
      }
    </>
  )
}

export default ContainerImg