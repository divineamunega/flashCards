import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import GenerateFlashCards from "./pages/GenerateFlashCards";
import Tasks from "./pages/Tasks";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useEffect, useState } from "react";
import StudySession from "./pages/StudySession";

const App = function () {
    const [user, setUser] = useState({});
    const [userIsLoading, setUserIsLoading] = useState(false);

    useEffect(() => {
        try {
            setUserIsLoading(true);
            const storedUser = localStorage.getItem("user");

            // If no "users" key exists, initialize it as an empty object
            if (!storedUser) {
                localStorage.setItem("user", JSON.stringify({}));
                setUser({});
            } else {
                // Try to parse the stored data and set it in state
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Something went wrong with localStorage:", error);
            localStorage.setItem("users", JSON.stringify({}));
            setUser({});
        } finally {
            setUserIsLoading(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LandingPage user={user} />} />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard user={user} userIsLoading={userIsLoading} />
                    }
                />

                <Route path="/auth" element={<Auth />}>
                    <Route path="" element={<Navigate to="login" />} />

                    <Route
                        path="login"
                        element={<Login user={user} handleSetUser={setUser} />}
                    />

                    <Route
                        path="signup"
                        element={
                            <Signup users={user} handleSetUser={setUser} />
                        }
                    />
                </Route>

                <Route path="/generate" element={<GenerateFlashCards />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/study/:deckName" element={<StudySession />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
