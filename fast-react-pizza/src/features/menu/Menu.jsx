import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";


function Menu() {
  const menu = useLoaderData()

  return (
      <ul>
        {menu.map((pizza, index) => (
            <MenuItem pizza={pizza} key={pizza.id}/>
        ))}
      </ul>
  )
}


export async function loader() {
  return await getMenu()
}


export default Menu;
