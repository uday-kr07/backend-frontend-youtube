import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import VideoDetails from "../pages/VideoDetails";



function AppRoutes() {

    return (
        <BrowserRouter>
        
            <Routes>
                <Route 
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/watch/:videoId"
                    element={<VideoDetails />}
                />

                

            </Routes>

        </BrowserRouter>

    )
}

export default AppRoutes;