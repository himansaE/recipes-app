import { useParams } from "react-router-dom";
import useAuth from "../../lib/hooks/useAuth";
import { LoadingPage } from "../utils/spin";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../lib/server";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const RecipeRoute = () => {
  const [data_loading, setDataLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  let params = useParams();

  const { loading, user } = useAuth();

  // load recipe data
  const loadData = async () => {
    // set data loading true because of refresh button
    setDataLoading(true);

    await axios
      .get(serverUrl(`/recipe/${encodeURI(params["id"])}`), {
        withCredentials: true,
      })
      .then((i) => {
        if (i.data.done) {
          setError();
          return setData({ ...i.data.data, id: params["id"] });
        }

        setError({
          error: i.data.data.error,
          need_refresh: false,
        });
      })
      .catch(() => {
        setError({
          need_refresh: true,
          error: "Can't Connect to the Server.",
        });
      })
      .finally(() => setDataLoading(false));
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");

    loadData();
  }, [loading]);

  if (data_loading) return <LoadingPage />;
  if (error != undefined)
    return (
      <div className="flex flex-col gap-3 justify-center items-center py-28 px-2">
        <p>{error.error}</p>
        {error.need_refresh && <Button onClick={loadData}>Refresh</Button>}
      </div>
    );
  return (
    <section className="mx-2 my-5 sm:mx-5">
      <h1 className="text-xl sm:text-3xl font-semibold">{data.recipe_name}</h1>
      <div className="flex justify-center items-center my-6">
        <div className="h-80 w-80 sm:h-96 sm:w-96 bg-indigo-50 rounded-lg"></div>
      </div>
      <div className="flex flex-row justify-end sm:justify-start gap-4">
        <Button
          component="label"
          variant="outlined"
          onClick={() => {
            navigate(`/edit/${encodeURI(data.id)}`);
          }}
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              ></path>
            </svg>
          }
        >
          Edit
        </Button>
        <Button
          component="label"
          variant="outlined"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
              ></path>
            </svg>
          }
          onClick={() => {
            const conf = confirm("Are you sure you want to delete this recipe");
            if (conf)
              axios
                .post(
                  serverUrl("/delete"),
                  { id: data.id },
                  { withCredentials: true }
                )
                .then(() => navigate("/"))
                .catch(() => alert("Something went wrong. Try again."));
          }}
        >
          Delete
        </Button>
      </div>
      <div className="">
        <div className="text-lg">About this Recipe</div>
        <div className="mx-1">
          {data.description.split("\n").map((i, n) => (
            <div key={n} className="my-2 text-sm">
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <div className="text-lg">Ingredient for this Recipe</div>
        <div>
          {data.ingredients.map((i, n) => (
            <li key={n} className="text-sm mx-1 list-outside">
              {i.name} - {i.amount}
            </li>
          ))}
        </div>
      </div>
    </section>
  );
};
