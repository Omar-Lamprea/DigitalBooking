
import ModalFormCategory from "../Modals/ModalFormCategory"
import CategoryCards from "./CategoryCard"
import { useEffect, useState } from 'react';


const RegisterCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://18.218.175.122:8080/digital-booking/category/all"
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Error en la solicitud:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="container-categories my-5">
        {data && data.map((category, i) =>
           <CategoryCards data={category} key={data.categoryId + '-' + i}/>
          )
        }
      </div>
      <ModalFormCategory />
    </div>
  )
}

export default RegisterCategory