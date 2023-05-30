
import CarouselImg from './CarouselImg';
import ContainerImg from './ContainerImg';
import './DContainerImages.scss'
import { useEffect, useState } from 'react';

const DContainerImages = (data) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isSmallScreen]);

  return (
    <div className="container-photos">
      {isSmallScreen 
        ? <CarouselImg images={data.images}/>
        : <ContainerImg images={data.images}/>
      }
    </div>
  )
}

export default DContainerImages