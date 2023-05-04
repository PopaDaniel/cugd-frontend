//import "./EmployeeTable.css";
import "../Pagination.css";
import Employee from "../Employee/Employee";
import { Component } from "react";
import ReactPaginate from "react-paginate";
import SearchBox from "../SearchBox/SearchBox";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      page: 1,
      employeePerPage: 10,
      searchField: "",
      length: "",
    };
  }

  onSearchChange = (e) => {
    this.setState({
      searchField: e.target.value,
    });
  };

  onChangePage = ({ selected }) => {
    this.setState({
      page: selected + 1,
    });
  };

  // onUserClick = (e) => {
  //   console.log(e.target);
  // };

  getSearchResults = () => {
    const filteredEmployees = this.state.users.filter((employee) => {
      return employee.employeeName
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    return filteredEmployees;
  };
  render() {
    const start = (this.state.page - 1) * this.state.employeePerPage;
    const end = this.state.page * this.state.employeePerPage;
    const employeesArr = this.getSearchResults();
    const employees = employeesArr.slice(start, end);
    return (
      <div>
        <SearchBox searchChange={this.onSearchChange} />
        <div className="pa4">
          <div className="overflow-auto center">
            <table className="f6 w-100 mw9 " cellSpacing="0">
              <thead>
                <tr className="stripe-dark">
                  <th className="fw6 pa3 bg-white">Name</th>
                  <th className="fw6 pa3 bg-white">Phone Number</th>
                  <th className="fw6 pa3 bg-white">Cnp</th>
                  <th className="fw6 pa3 bg-white">ID</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {employees.map((user, i) => {
                  return (
                    <Employee
                      key={i}
                      id={user._id}
                      name={user.employeeName}
                      phoneNumber={user.phoneNumber}
                      cnp={user.cnp}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={this.onChangePage}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(
                employeesArr.length / this.state.employeePerPage
              )}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
              containerClassName={"navigationButtons"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"navigationDisabled"}
              activeClassName={"navigationActive"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeTable;
