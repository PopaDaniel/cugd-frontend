import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Signin from "../src/components/Signin/Signin";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import AddNewEmployee from "./components/AddNewEmployee/AddNewEmployee";
import SendMessage from "./components/SendMessage/SendMessage";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import { getLocalStorage, setLocalStorage } from "../src/helpers/localStorage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [employeesList, setEmployeesList] = useState([]);
  const [jwt, setJwt] = useState("");
  const [manager, setManager] = useState({
    name: "",
    img: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = getLocalStorage("jwt");
    if (jwt) {
      setJwt(jwt);
      fetchData(jwt);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async (jwt) => {
    try {
      const { data } = await axios.get("http://localhost:3001/", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const imgData = [data[0][0]];
      setEmployeesList(data[1]);
      setManager({
        name: data[0][0].managerName,
        img: imgData,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setJwt("");
      setLocalStorage("jwt", "");
    } finally {
      setLoading(false);
    }
  };

  const getJwt = (newJwt) => {
    setJwt(newJwt);
    setLocalStorage("jwt", newJwt);
    fetchData(newJwt);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {jwt && manager.name.length ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={<Dashboard totalEmployees={employeesList.length} />}
            />
            <Route
              path="/employees"
              element={<EmployeeTable users={employeesList} />}
            />
            <Route path="/addemployee" element={<AddNewEmployee />} />
            <Route
              path="/sendmessage"
              element={<SendMessage contacts={employeesList} />}
            />
            <Route path="/profile" element={<Profile manager={manager} />} />
            <Route path="/userprofile/:id" element={<EmployeeProfile />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="*" element={<Signin getUserJwt={getJwt} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
