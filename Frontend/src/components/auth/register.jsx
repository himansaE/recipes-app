import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Copyright } from "../utils/copyright";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../lib/server";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../lib/hooks/useAuth";

import { LoadingPage } from "../utils/spin";
export function Register() {
  const [is_submitting, setSubmitting] = useState(false);
  const [error, errorFunc] = useState({});
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  // set error for form
  // if input is undefined it remove all errors messages form form
  const setError = (err_in, text) => {
    if (err_in == undefined) return errorFunc({});
    errorFunc({ [err_in]: text });
  };

  const handleSubmit = async (event) => {
    if (is_submitting) return;
    setSubmitting(true);
    setError();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(
        serverUrl("/register"),
        {
          name: data.get("name"),
          email: data.get("email"),
          pass: data.get("password"),
          remember: data.get("remember"),
        },
        { withCredentials: true }
      )
      .then((i) => {
        if (i.data.done) {
          navigate("/");
        } else {
          setError(i.data.data.in, i.data.data.text);
          setSubmitting(false);
        }
      })
      .catch(() => {
        setError("all", "Something Went Wrong.");
        setSubmitting(false);
      });
  };
  if (loading) return <LoadingPage />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/app_icon.webp"
          alt="My Recipes Logo"
          height={57.25}
          width={150}
          className="mb-5"
        />
        <h1 className="font-medium text-3xl">Register Now</h1>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoComplete="name"
            autoFocus
            disabled={is_submitting}
            error={typeof error.name === "string"}
            helperText={error.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            disabled={is_submitting}
            error={typeof error.email === "string"}
            helperText={error.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={typeof error.pass === "string"}
            helperText={error.pass}
            disabled={is_submitting}
          />
          <FormControlLabel
            control={<Checkbox value="true" color="primary" name="remember" />}
            label="Remember me"
            disabled={is_submitting}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={is_submitting}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                to="/login"
                className="text-blue-700 hover:underline text-sm"
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
