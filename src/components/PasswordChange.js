import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../api/client";
import { useLoading } from "./contexts/LoadingContext";

const initialValues = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  current_password: Yup.string().required("هذا الحقل مطلوب"),

  new_password: Yup.string()
    .required("هذا الحقل مطلوب")
    .min(8, "كلمة المرور هذه قصيرة جدًا. يجب أن تكون 8 على الأقل"),

  confirm_password: Yup.string()
    .required("هذا الحقل مطلوب")
    .oneOf([Yup.ref("new_password")], "كلمة المرور غير متطابقة"),
});

function PasswordChange() {
  const [showForm, setShowForm] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const onSubmit = async (values, { setErrors }) => {
    setIsLoading(true);

    try {
      const response = await apiClient.post(
        "accounts/change-password/",
        values
      );

      console.log("Password updated:", response.data);

      // 🔥 Important for security
      logout();
      navigate("/login");

    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-change section">
      <div className="current-data">
        <h3>تغيير كلمة المرور :</h3>
        <h3>**********</h3>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="change-btn"
          >
            تعديل
          </button>
        )}
      </div>

      {showForm && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form noValidate>
            <div className="inp-container">

              <div className="form-group">
                <label>كلمة المرور الحالية</label>
                <Field type="password" name="current_password" />
                <ErrorMessage name="current_password">
                  {(msg) => <div className="errorMessage">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label>كلمة المرور الجديدة</label>
                <Field type="password" name="new_password" />
                <ErrorMessage name="new_password">
                  {(msg) => <div className="errorMessage">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label>تأكيد كلمة المرور</label>
                <Field type="password" name="confirm_password" />
                <ErrorMessage name="confirm_password">
                  {(msg) => <div className="errorMessage">{msg}</div>}
                </ErrorMessage>
              </div>

            </div>

            <div className="btns-container">
              <input type="submit" value="حفظ" />

              <button
                type="button"
                className="cancle-btn"
                onClick={() => setShowForm(false)}
              >
                إلغاء
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default PasswordChange;
