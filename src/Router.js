import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CommonTemplate from "./components/CommonTemplate";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ShoppingPage from "./components/ShoppingPage/ShoppingPage";
import PaintDetails from "./components/PaintDetails/PaintDetails";
import MyAccount from "./components/MyAccount/MyAccount";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import MyFavourite from "./components/MyFavourite/MyFavourite";
import MyOrders from "./components/MyOrders/MyOrders";
import MyNotifications from "./components/MyNotifications/MyNotifications";
import LoginPage from "./components/LoginPage/LoginPage";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
// import ActivateAccount from "./components/ActivateAccount/ActivateAccount";
import PasswordReset from "./components/PasswordReset/PasswordRest";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import StripePaymentForm from "./components/Payment/Payment";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";
import ScrollToTop from "./components/ScrollToTop";


const Router = () => {
    const scrollPaths = ["/", "/shopping", "/paint-details", "/About", "/register", "/login", "/cart"];

    return (
        <>
            <ScrollToTop scrollPaths={scrollPaths} />
            <Routes>
                <Route element={<CommonTemplate />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shopping" element={<ShoppingPage />} />
                    <Route path="/paint-details/:id" element={<PaintDetails />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/account/*" element={<MyAccount />}>
                        <Route path="account-settings" element={<AccountSettings />} />
                        <Route path="my-favourite" element={<MyFavourite />} />
                        <Route path="my-orders" element={<MyOrders />} />
                        <Route path="my-notifications" element={<MyNotifications />} />
                    </Route>
                </Route>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/activate/:uid/:token" element={<ActivateAccount />} /> */}
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password-confirm" element={<PasswordReset />} />
                <Route path="/payment" element={<StripePaymentForm />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
        </>
    );
};


export default Router;
