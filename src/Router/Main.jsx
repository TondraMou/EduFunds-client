import { Outlet } from "react-router-dom";
import Navbar from "../component/Shared/Navbar";
import Footer from "../component/Shared/Footer";


const Main = () => {
    return (
        <div className="font-inter">
            <Navbar></Navbar>
            <div className="md:max-w-screen-xl mx-auto">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;