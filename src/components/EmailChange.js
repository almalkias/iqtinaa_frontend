import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../api/client";
import { useLoading } from "./contexts/LoadingContext";

const validationSchema = Yup.object({
  new_email: Yup.string()
    .email("صيغة الايميل غير صحيحه")
    .required("هذا الحقل مطلوب"),
});

function EmailChange() {
  const [showForm, setShowForm] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [profileData, setProfileData] = useState(null);

  const initialValues = {
    new_email: profileData?.email || "",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("accounts/profile/");
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (values, { setErrors }) => {
    setIsLoading(true);

    try {
      const response = await apiClient.put(
        "accounts/profile/",
        {
          email: values.new_email,
        }
      );

      console.log("Email updated:", response.data);

      // Log out after changing the email
      await logout();
      navigate("/login");
    } catch (error) {
      if (error.response?.data) {
        const apiErrors = error.response.data;

        setErrors({
          new_email: apiErrors.email
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-change section">
      <div className="current-data">
        <h3>البريد الالكتروني:</h3>
        <h3>{profileData?.email}</h3>

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
          enableReinitialize
        >
          <Form noValidate>
            <div className="inp-container">
              <div className="form-group">
                <label>البريد الإلكتروني الجديد</label>
                <Field
                  type="email"
                  id="new_email"
                  name="new_email"
                />
                <ErrorMessage name="new_email">
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

export default EmailChange;
