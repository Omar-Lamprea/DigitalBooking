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
            <img src={images[0]?.url} alt="" />
          </div>
          <div className="second-images">
            <img src={images[1] ? images[1]?.url : images[0]?.url} alt=""  className=""/>
            <img src={images[2] ? images[2]?.url : images[0]?.url} alt=""  className=""/>
            <img src={images[3] ? images[3]?.url : images[0]?.url} alt=""  className=""/>
            <img src={images[4] ? images[4]?.url : images[0]?.url} alt=""  className="img-shadow"/>
            
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