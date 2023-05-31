
import ModalFormCategory from "../Modals/ModalFormCategory"
import Default from '../../assets/images/default.png'
import CategoryCards from "./CategoryCard"


const RegisterCategory = () => {
  const categorias = [
    {
      id:0,
      imagen:Default,
      nombre:"Hoteles",
      descripcion:"Un hotel es un establecimiento cuyo principal servicio es el hospedaje, ofreciendo a las personas cierto nivel de confort y seguridad durante sus estadías. Entre sus servicios complementarios más importantes, se encuentra: alimentación, limpieza, wifi, aparcamiento y zonas de entretenimiento.",
    },
    {
      id:1,
      imagen:Default,
      nombre:"Cabañas",
      descripcion:"Un hotel es un establecimiento cuyo principal servicio es el hospedaje, ofreciendo a las personas cierto nivel de confort y seguridad durante sus estadías. Entre sus servicios complementarios más importantes, se encuentra: alimentación, limpieza, wifi, aparcamiento y zonas de entretenimiento.",
    },
    {
      id:2,
      imagen:Default,
      nombre:"Cabañas",
      descripcion:"Un hotel es un establecimiento cuyo principal servicio es el hospedaje, ofreciendo a las personas cierto nivel de confort y seguridad durante sus estadías. Entre sus servicios complementarios más importantes, se encuentra: alimentación, limpieza, wifi, aparcamiento y zonas de entretenimiento.",
    }
  ]
  return (
    <div>
      <div className="container-categories my-5">
        {categorias.map((category, i) =>
           <CategoryCards data={category} key={category.id + '-' + i}/>
          )
        }
      </div>
      <ModalFormCategory />
    </div>
  )
}

export default RegisterCategory