import { SnackbarProvider } from "notistack";
import "./App.css";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Editor from "./Components/Editor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes, {
  WithNav,
  WithoutNav,
} from "./Components/Auth/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          {/* non authenticated routes */}
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          {/* authenticated Routes */}
          <Route element={<WithNav />}>
            <Route element={<PrivateRoutes />}>
              {/* <PrivateRoutes /> */}
              <Route path="/editor" element={<Editor />} />
              <Route path="/" element={<Editor />} />
            </Route>
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
