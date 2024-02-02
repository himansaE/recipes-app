import { useState } from "react";
import useAuth from "../../lib/hooks/useAuth";
import { serverUrl } from "../../lib/server";
import axios from "axios";
import { useEffect } from "react";
import { LoadingPage } from "../utils/spin";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data_loading, setDataLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  const { loading, user } = useAuth();

  const loadData = async () => {
    // set data loading true because of refresh button
    setDataLoading(true);

    await axios
      .get(serverUrl("/list"), {
        withCredentials: true,
      })
      .then((i) => {
        if (i.data.done) {
          setError();
          return setData(i.data.data);
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
    <div className="px-2 ms:px-5 py-5">
      <h1 className="text-3xl font-semibold">Hi {user.name}</h1>
      <p className="text-sm">Recipe library</p>
      <div className="flex justify-end mx-2 sm:mx-8  my-4">
        <Button
          href="/add"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8v3H8q-.425 0-.712.288T7 12q0 .425.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
              ></path>
            </svg>
          }
        >
          Add Recipe
        </Button>
      </div>
      <div>
        {data.map((i) => (
          <Link
            key={i.id}
            to={`recipe/${i.id}`}
            className="flex sm:flex-col gap-4  sm:gap-2 px-2 sm:px-1 py-1 hover:bg-indigo-50/80 transition-colors sm:w-56 sm:rounded-lg sm:ring-1 sm:ring-indigo-200"
          >
            {/* to represent recipe image */}
            <div className="min-h-11 min-w-20 sm:h-56 sm:w-full bg-indigo-200/80 rounded-md"></div>
            <div className="sm:px-2">
              <div className="line-clamp-1">
                {i.recipe_name}wefe ewfewf wefewfwef ewfewfewfwef ewfewfewfwef
                ewfewfweff
              </div>
              <div className="text-xs">{i.ingredients.length} ingredients</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
