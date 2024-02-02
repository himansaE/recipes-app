import { useParams } from "react-router-dom";

export const RecipeRoute = () => {
  let params = useParams();
  console.log(params["id"]);
  return <></>;
};
