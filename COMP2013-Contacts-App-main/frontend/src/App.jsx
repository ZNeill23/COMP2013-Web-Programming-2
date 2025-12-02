import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import ContactsApp from "./Components/ContactsApp";
import PrivateRoute from "./Components/PrivateRoute";
import NotAuthorized from "./Components/NotAuthorized";
import PageNotFound from "./Components/PageNotFound";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/contacts" element={<ContactsApp />} />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
