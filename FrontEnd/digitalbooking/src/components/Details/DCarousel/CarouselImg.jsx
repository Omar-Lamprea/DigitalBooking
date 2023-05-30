import Carousel from 'react-bootstrap/Carousel';

const CarouselImg = (data) => {
  const images = data.images
  return (
    <>
      {images && 
        <Carousel controls={false} className='carousel-images'>
          {images.map ((image, i) => 
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={image}
                alt="product-image"/>
            </Carousel.Item>)
          }
        </Carousel>
      }
    </>
  )
}

export default CarouselImg