import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        My Recipes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
