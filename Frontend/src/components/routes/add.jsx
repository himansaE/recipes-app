import { useEffect } from "react";
import useAuth from "../../lib/hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../utils/spin";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ListInput } from "../utils/list-input";
import { useState } from "react";
export const AddPage = () => {
  const { loading, user } = useAuth();
  const [ingredients, setIngredients] = useState([
    { name: "rrgreg", amount: "23" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
  }, [loading]);

  if (loading) return <LoadingPage />;
  return (
    <main className="my-5 mx-2 sm:mx-4 md:mx-10">
      <h1 className="text-3xl font-semibold">Add Recipe to Library</h1>
      <Box
        component="form"
        onSubmit={() => {}}
        sx={{ mt: 1 }}
        className="max-w-2xl py-5 "
      >
        <h2>Basic Information about Recipe</h2>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Recipe Name"
          name="recipe_name"
          autoFocus
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
        />
        <h2 className="mt-5">Ingredients</h2>

        <ListInput value={ingredients} onChange={setIngredients} />
        <div className="flex justify-end px-5 py-4">
          <Button variant="contained">Save Recipe</Button>
        </div>
      </Box>
    </main>
  );
};
