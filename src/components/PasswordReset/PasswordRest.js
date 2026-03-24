import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './PasswordReset.css';
import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../contexts/LoadingContext';

const notifySuccess = () => {
    toast.success("تم تغيير كلمة المرور بنجاح", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

const notifyError = () => {
    toast.error("حدث خطأ أثناء تغيير كلمة المرور. يرجى محاولة استعادة كلمة المرور من صفحة تسجيل الدخول مرة أخرى", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};


const initialValues = {
    new_password: '',
    password2: '',
}


const validationSchema = Yup.object({
    new_password: Yup.string()
        .required('هذا الحقل مطلوب')
        .min(8, 'كلمة المرور هذه قصيرة جدًا. يجب أن تكون 8 على الأقل')
        .test('is-numeric', 'كلمة المرور هذه تحتوي على ارقام فقط', (value) => {
            return isNaN(Number(value)) || typeof value !== 'string';
        }),
    password2: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'كلمة المرور غير متطابقة')
        .required('هذا الحقل مطلوب')
})

function PasswordReset() {
    const { uid, token } = useParams();
    const { setIsLoading } = useLoading();


    const onSubmit = async (values, { setErrors }) => {
        setIsLoading(true);
        try {
            const response = await axios.post("auth/users/reset_password_confirm/",
                {
                    ...values,
                    uid,
                    token,
                });
            notifySuccess()
            console.log('password reset successful', response);
        } catch (error) {
            if (error.response && error.response.data) {
                notifyError()
                setErrors(error.response.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="password-reset">
            <Link to="/">
                <img src={logo} alt="" />
                <img src={title} alt="" />
            </Link>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                <Form noValidate>
                    <div className='form-field-group'>
                        <label htmlFor="new_password"><span>*</span>كلمة المرور</label>
                        <Field type="password" name="new_password" />
                        <ErrorMessage name="new_password">
                            {msg => <div className="errorMessage">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div className='form-field-group'>
                        <label htmlFor="password2"><span>*</span>تأكيد كلمة المرور</label>
                        <Field type="password" name="password2" required />
                        <ErrorMessage name="password2">
                            {msg => <div className="errorMessage">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <input type="submit" value="ارسال" />
                </Form>
            </Formik>
            <ToastContainer rtl />
        </div>
    );
}

export default PasswordReset;