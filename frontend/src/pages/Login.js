import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Paper, Link } from '@mui/material';
import { login } from '../services/api';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Enter a valid email')
                .required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const res = await login(values);
                localStorage.setItem('token', res.data.token);

                const decoded = JSON.parse(atob(res.data.token.split('.')[1]));

                if (decoded.role === 'admin') {
                    navigate('/dashboard');
                } else if (decoded.role === 'driver') {
                    navigate('/my-vehicle');
                }
            } catch (err) {
                setErrors({ general: 'Login failed. Please check your credentials.' });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <Paper elevation={4} className="p-10 w-full max-w-md shadow-md rounded-md">
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div className="text-center">
                        <Typography variant="h4" className="font-bold text-blue-600">
                            Sign In
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Welcome back! Please login to your account.
                        </Typography>
                    </div>

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        variant="outlined"
                    />



                    {formik.errors.general && (
                        <Typography color="error" className="text-sm text-center">
                            {formik.errors.general}
                        </Typography>
                    )}

                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={formik.isSubmitting}
                            sx={{
                                py: 1.5,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                textTransform: 'none'
                            }}
                        >
                            Log In
                        </Button>
                    </Box>

                    <Box className="text-right -mt-3">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleForgotPassword}
                            underline="hover"
                            color="primary"
                        >
                            Forgot password?
                        </Link>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};

export default Login;
