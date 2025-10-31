import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import PNF from "./components/PNF";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Contacts from "./pages/Contacts";
import Careers from "./pages/Careers";
import AllBooks from "./pages/AllBooks";

import AdminHome from "./admin/pages/AdminHome";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminSettings from "./admin/pages/AdminSettings";
import ProfilePage from "./pages/ProfilePage";
import ViewBooks from "./pages/ViewBooks";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";




function App() {
  const [isShowLanding, setIsShowLanding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowLanding(true);
    }, 2500);
  }, []);
  return (
    <>
    
      <Routes>
        <Route
          path="/"
          element={isShowLanding ? <LandingPage /> : <Loader />}
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/books" element={<AllBooks />} />
        {/* Router Params */}
        <Route path="/view-book/:id" element={<ViewBooks/>}/>
        <Route path="/payment-success" element={<PaymentSuccess/>}/>
        <Route path="/payment-failed" element={<PaymentFailure/>}/>
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-books" element={<AdminBooks />} />
        <Route path="/admin-careers" element={<AdminCareers />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="*" element={<PNF />} />
        <Route path="/profile" element={<ProfilePage/>}/>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
