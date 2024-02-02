import { useEffect } from "react";
import useAuth from "../../lib/hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../utils/spin";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ListInput } from "../utils/list-input";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../lib/server";
export const AddPage = () => {
  const { loading, user } = useAuth();
  const [ingredients, setIngredients] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, errorFunc] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [loading]);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError();
    const data = new FormData(e.currentTarget);
    await axios
      .post(
        serverUrl("/add"),
        {
          recipe_name: data.get("recipe_name"),
          description: data.get("description"),
          ingredients,
        },
        { withCredentials: true }
      )
      .then((i) => {
        if (i.data.done == true)
          return navigate(`/recipe/${encodeURI(i.data.data)}`);

        setError(i.data.data.in, i.data.data.text);
        setSubmitting(false);
      })
      .catch(() => {
        setError("all", "Something went wrong. Try again.");
        setSubmitting(false);
      });
  };

  const setError = (err_in, text) => {
    if (err_in == undefined) return errorFunc({});
    errorFunc({ [err_in]: text });
  };

  if (loading) return <LoadingPage />;
  return (
    <main className="my-5 mx-2 sm:mx-4 md:mx-10">
      <h1 className="text-3xl font-semibold">Add Recipe to Library</h1>
      <Box
        component="form"
        onSubmit={submit}
        sx={{ mt: 1 }}
        className="max-w-2xl py-5 "
      >
        <p className="text-red-500 mb-4">{error.all}</p>
        <h2>Basic Information about Recipe</h2>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Recipe Name"
          name="recipe_name"
          autoFocus
          disabled={submitting}
          error={typeof error.recipe_name === "string"}
          helperText={error.recipe_name}
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
          error={typeof error.description === "string"}
          helperText={error.description}
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
