import { useParams } from "react-router-dom";
import useAuth from "../../lib/hooks/useAuth";
import { LoadingPage } from "../utils/spin";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../lib/server";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ListInput } from "../utils/list-input";
export const EditRoute = () => {
  const [data_loading, setDataLoading] = useState(true);

  // form states
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [id, setId] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState();
  const [form_error, errorFunc] = useState({});
  const navigate = useNavigate();
  let params = useParams();

  const { loading } = useAuth();

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
          setName(i.data.data.recipe_name);
          setDes(i.data.data.description);
          setId(i.data.data.id);
          setIngredients(i.data.data.ingredients);
          return;
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

  // submit for edit
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError();
    await axios
      .post(
        serverUrl("/edit"),
        {
          recipe_name: name,
          description: des,
          ingredients,
          id,
        },
        { withCredentials: true }
      )
      .then((i) => {
        if (i.data.done == true)
          return navigate(`/recipe/${encodeURI(i.data.data)}`);

        setFormError(i.data.data.in, i.data.data.text);
        setSubmitting(false);
      })
      .catch(() => {
        setFormError("all", "Something went wrong. Try again.");
        setSubmitting(false);
      });
  };
  const setFormError = (err_in, text) => {
    if (err_in == undefined) return errorFunc({});
    errorFunc({ [err_in]: text });
  };
  useEffect(() => {
    if (loading) return;
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
    <main className="my-5 mx-2 sm:mx-4 md:mx-10">
      <h1 className="text-3xl font-semibold">Edit Recipe</h1>
      <Box
        component="form"
        onSubmit={submit}
        sx={{ mt: 1 }}
        className="max-w-2xl py-5 "
      >
        {<p className="text-red-500 mb-4">{form_error.all}</p>}
        <h2>Basic Information about Recipe</h2>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Recipe Name"
          name="recipe_name"
          autoFocus
          disabled={submitting}
          error={typeof form_error.recipe_name === "string"}
          helperText={form_error.recipe_name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="About this Recipe"
          name="description"
          multiline
          minRows={3}
          maxRows={Infinity}
          disabled={submitting}
          error={typeof form_error.description === "string"}
          helperText={form_error.description}
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
        <h2 className="mt-5">Ingredients</h2>

        <ListInput
          value={ingredients}
          onChange={setIngredients}
          disabled={submitting}
        />
        <div className="flex justify-end px-5 py-4">
          <Button variant="contained" type="submit" disabled={submitting}>
            Save Recipe
          </Button>
        </div>
      </Box>
    </main>
  );
};
