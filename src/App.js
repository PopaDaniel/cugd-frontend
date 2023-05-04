import "./App.css";
import { Component } from "react";
import axios from "axios";
import Signin from "../src/components/Signin/Signin";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import AddNewEmployee from "./components/AddNewEmployee/AddNewEmployee";
import SendMessage from "./components/SendMessage/SendMessage";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import { getLocalStorage } from "../src/helpers/localStorage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      employeesList: [],
      jwt: "",
      manager: {
        name: "",
        img: [],
      },
    };
  }

  onRouteChange = (route) => {
    this.setState({
      route: route,
    });
  };

  getJwt = (jwt) => {
    this.setState({
      jwt: jwt,
    });
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3001/");

    const imgData = [data[0][0]];
    this.setState({
      employeesList: data[1],
      manager: {
        name: data[0][0].managerName,
        img: imgData,
      },
    });
  }

  render() {
    const manager = this.state.manager;
    const employeeList = this.state.employeesList;
    if (this.state.jwt || (getLocalStorage("jwt") && manager.name.length)) {
      return (
        <Router>
          <Sidebar>
            <Routes>
              <Route
                path="/dashboard"
                exact
                element={<Dashboard totalEmployees={employeeList.length} />}
              />
              <Route
                path="/employees"
                element={<EmployeeTable users={employeeList} />}
              />
              <Route path="/addemployee" element={<AddNewEmployee />} />
              <Route
                path="/sendmessage"
                element={<SendMessage contacts={employeeList} />}
              />
              <Route path="/profile" element={<Profile manager={manager} />} />
              <Route path="/userprofile/:id" element={<EmployeeProfile />} />
            </Routes>
          </Sidebar>
        </Router>
      );
    } else {
      return (
        <Router>
          <Routes>
            <Route path="*" element={<Signin getUserJwt={this.getJwt} />} />
          </Routes>
        </Router>
      );
    }
  }
}

export default App;
