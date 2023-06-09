import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../../store/auth/authActions";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {resetError} from "../../store/auth/authSlice.js";

export const AuthLoginForm = () => {
    const dispatch = useDispatch()
    const [err, setErr] = useState(null)
    const loading = useSelector((state)=>state.auth.loading)
    let user = useSelector((state)=>state.auth.user)
    let error = useSelector((state)=>state.auth.error)

    useEffect(() => {
        dispatch(resetError());
        if (user) {
            toast.success(`Welcome ${user.name}`);
        } else if (error) {
            setErr(error);
        }
    }, [user, error]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required Field').email('Not a proper email'),
            password: Yup.string().required('Required Field'),
        }),
        onSubmit: (values) => {
            dispatch(loginAction(values.email, values.password)); // Perform any necessary logic with the form values
            // if(user) {
            //     toast.success(`Welcome ${user.name}`)
            // } else {
            //     setErr(error)
            // }
        },
    });

    return (
        <div className="container flex items-center justify-center">
            <div className="card flex w-1/3 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col w-full gap-5">
                            <input
                                type="email"
                                className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="flex w-full">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center" />
                                    <span className="text-error text-xs pl-2">{formik.errors.email}</span>
                                </div>
                            ) : null}
                            <input
                                type="password"
                                className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="flex w-full">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center" />
                                    <span className="text-error text-xs pl-2">{formik.errors.password}</span>
                                </div>
                            ) : null}

                            {err ? (
                                <div className="flex gap-2 items-center bg-opacity-20 bg-error p-2 border rounded border-error">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                                    <div className="text-error text-xs">{err}</div>
                                </div>
                            ): null}

                            <Link to="/auth/forgot-password" className="flex justify-end w-full">
                                <span className="text-xs text-opacity-20 link">Forgot Password?</span>
                            </Link>

                            <div className="flex justify-between">
                                <span>
                                  Create an account?
                                  <Link to="/auth/register" className="link">
                                    Register
                                  </Link>
                                </span>

                                <button type="submit"
                                        className={`flex w-1/5 btn btn-sm btn-primary text-base-100
                                            ${loading ? 'opacity-50 pointer-events-none' : ''}
                                        `}
                                        disabled={loading}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
