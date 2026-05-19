import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import VideoDetails from "../pages/VideoDetails";
import Profile from "../pages/Profile";
import Channel from "../pages/Channel";
import LikedVideos from "../pages/LikedVideos";
import Playlist from "../pages/Playlist";
import Subscriptions from "../pages/Subscriptions";
import Tweets from "../pages/Tweets";
import WatchHistory from "../pages/WatchHistory";
import ProtectedRoute from "./ProtectedRoute";



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
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/watch/:videoId"
                    element={<VideoDetails />}
                />

                <Route
                    path="/liked"
                    element={
                        <ProtectedRoute>
                            <LikedVideos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <WatchHistory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/playlists"
                    element={
                        <ProtectedRoute>
                            <Playlist />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/subscriptions"
                    element={
                        <ProtectedRoute>
                            <Subscriptions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tweets"
                    element={
                        <ProtectedRoute>
                            <Tweets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/channel/:username"
                    element={
                        <ProtectedRoute>
                            <Channel />
                        </ProtectedRoute>
                    }
                />

                

            </Routes>

        </BrowserRouter>

    )
}

export default AppRoutes;
