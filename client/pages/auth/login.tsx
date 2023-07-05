import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Typography, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { useLoginMutation } from '@/store/api/usersApi';
import { useRouter } from 'next/router';
import { useTypedSelector } from '@/hook/useTypedSelector';
import { ILoginUserDto } from '@/model';
import { useTypedDispatch } from '@/hook/useTypedDispatch';
import validationSchema from '../../schema/schema'
import { yupResolver } from '@hookform/resolvers/yup';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useTypedDispatch()
  const router = useRouter();

  const methods = useForm<ILoginUserDto>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState: { errors, isValid } } = methods

  const [login] = useLoginMutation();

  const { userInfo } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo !== null) {
      router.push('/');
    }
  }, [router, userInfo]);

  const onSubmit: SubmitHandler<ILoginUserDto> = async (data) => {
    setIsLoading(true);
    try {
      const res = await login(data).unwrap();
      console.log({ ...res })
      setUser({ ...res });
      router.push('/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Sign In
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              {...register('email')}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </Grid>
        </Grid>
        <pre style={{ maxWidth: '600px', maxHeight: '300px', overflow: 'auto', margin: '1rem auto' }}>
          `email : qwerr@gmail.com, password: 123456`
        </pre>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading || !isValid && true}
          style={{ marginTop: '1rem' }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </form>



      <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
        <Grid item>
          <Button onClick={() => router.push('/auth/register')}>
            New Customer? Register
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginScreen;
