import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./src/App";
import Home from "./src/pages/Home/Home";
import SignUp from "./src/pages/SignUp/SignUp";
import SignIn from "./src/pages/SignIn/SignIn";
import Logout from "./src/pages/Logout/Logout";

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route path="" element={<Home />} />
                <Route path="auth/signup" element={<SignUp />} />
                <Route path="auth/signin" element={<SignIn />} />
                <Route path="auth/logout" element={<Logout />} />
            </Route>
        </>
    )
)

export default appRouter;