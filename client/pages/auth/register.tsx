import { useState, useEffect } from "react";
import { Container, Typography, Grid, TextField, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTypedSelector } from "@/hook/useTypedSelector";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/store/api/usersApi";
import { IRegisterUserDto } from "@/model";
import { useTypedDispatch } from "@/hook/useTypedDispatch";

interface FormData extends IRegisterUserDto {
  confirmPassword: string;
}

const RegisterScreen = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { setUser } = useTypedDispatch()
  const [registerUser] = useRegisterMutation();

  const { userInfo } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registerUser({ email: data.email, password: data.password }).unwrap();
        setUser(res);
        // router.push(redirect);
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", { required: "Confirm Password is required" })}
              error={!!errors.confirmPassword}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          style={{ marginTop: "1rem" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>

      <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
        <Grid item>
          <Link href="/login">Already have an account? Login</Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterScreen;
