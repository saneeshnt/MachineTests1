import React from 'react';
import "./AddUser.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .required('Name is required'),
            phone: Yup.string()
                .matches(/^[0-9]+$/, 'Phone number must be numeric')
                .min(10, 'Phone number must be at least 10 digits')
                .required('Phone number is required'),
        }),
        onSubmit: (values) => {
            console.log('Form data', values);
            // You can add the logic to save the user here
            
            // Navigate to the User List page
            navigate('/user-list');
        },
    });

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Add User</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>
                    ) : null}
                </div>

                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;
