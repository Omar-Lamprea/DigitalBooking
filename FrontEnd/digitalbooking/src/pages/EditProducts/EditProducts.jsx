import { useContextGlobal } from "../../context/global.context"
import EditProductsCard from "./EditProductsCard";
import './EditProducts.scss'

const EditProducts = () => {
  const {state} = useContextGlobal()
  return (
    <div className="container-products my-5">
      {state.APIdata && 
        state.APIdata.map((product, i) =>
          <EditProductsCard data={product} key={product.id + '-' + i}/>
        )
      }
    </div>
  )
}

export default EditProducts