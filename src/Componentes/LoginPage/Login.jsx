import React from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

import { login } from "../../Services/UserAPI";

function Login() {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const { data } = await login(values);
                console.log(data, "USER RETURN DATA !!!");
                if (data.created) {
                    localStorage.setItem("jwt", data.token);
                    toast.success("Login Successful", { position: "top-right" });
                    navigate("/add");
                } else {
                    toast.error(data.message, { position: "top-right" });
                }
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong. Please try again.", { position: "top-right" });
            }
        },
    });

    return (
        <div className="login-container">
            <div className="loginform">
                <h1>LOGIN</h1>
                <p>Please enter your username and password</p>
                <form onSubmit={formik.handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        className='l-uname'
                        placeholder='Enter your username...'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="error-message" style={{ marginTop: "5px", color: "red" }}>
                            {formik.errors.username}
                        </p>
                    )}
                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        className='l-pass'
                        placeholder='Enter your password...'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="error-message" style={{ marginTop: "5px", color: "red" }}>
                            {formik.errors.password}
                        </p>
                    )}
                    <br />
                    <button
                        type="submit"
                        className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
