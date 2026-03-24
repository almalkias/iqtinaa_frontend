import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import apiClient from "../api/client";
import { useLoading } from "./contexts/LoadingContext";

function PersonalInfo() {
  const { setIsLoading } = useLoading();
  const [profileData, setProfileData] = useState(null);

  const initialValues = {
    first_name: profileData?.first_name || "",
    last_name: profileData?.last_name || "",
    country: profileData?.country || "",
    city: profileData?.city || "",
    birth_date: profileData?.birth_date || "",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("accounts/profile/");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (values, { setErrors }) => {
    setIsLoading(true);

    try {
      if (values.birth_date === '') {
        values.birth_date = null;
      }
      const response = await apiClient.put(
        "accounts/profile/",
        values
      );
      setProfileData(response.data);
      console.log("Updated:", response.data);
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
    <div className="personal-info section">
      {/* <h3>البيانات الشخصية :</h3> */}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form noValidate>
          <div className="inp-container">
            <div className="form-group">
              <label>الاسم الأول</label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
              />
              <ErrorMessage name="first_name">
                {msg => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label>الاسم الأخير</label>
              <Field
                type="text"
                id="last_name"
                name="last_name"
              />
              <ErrorMessage name="last_name">
                {msg => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label>الدولة</label>
              <Field type="text" id="country" name="country" />
              <ErrorMessage name="country">
                {msg => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label>المدينة</label>
              <Field type="text" id="city" name="city" />
              <ErrorMessage name="city">
                {msg => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label>تاريخ الميلاد</label>
              <Field
                type="date"
                id="birth_date"
                name="birth_date"
              />
              <ErrorMessage name="birth_date">
                {msg => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>
          </div>
          <div className="btns-container">
            <input type="submit" value="حفظ التعديلات" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default PersonalInfo;
