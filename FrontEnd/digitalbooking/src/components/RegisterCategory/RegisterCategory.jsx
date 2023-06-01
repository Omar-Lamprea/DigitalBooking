
import { useContextGlobal } from "../../context/global.context";
import ModalFormCategory from "../Modals/ModalFormCategory"
import CategoryCards from "./CategoryCard"

const RegisterCategory = () => {
  const {state} = useContextGlobal()
  return (
    <div>
      <div className="container-categories my-5">
        {state.categories ? (
            state.categories.map((category, i) => (
              <CategoryCards data={category} key={category.categoryId + '-' + i} />
            ))
          ) : (
            <p>No existen categorías aún</p>
          )}
      </div>
      <ModalFormCategory />
    </div>
  )
}

export default RegisterCategory