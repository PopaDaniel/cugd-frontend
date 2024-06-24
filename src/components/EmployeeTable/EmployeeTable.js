import React, { useState, useEffect } from "react";
import "./EmployeeTable.css"; // Importing the custom CSS file
import Employee from "../Employee/Employee";
import ReactPaginate from "react-paginate";

import SearchBox from "../SearchBox/SearchBox";

const EmployeeTable = ({ users }) => {
  const [page, setPage] = useState(1);
  const [employeePerPage] = useState(10);
  const [searchField, setSearchField] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(users);

  useEffect(() => {
    setFilteredEmployees(
      users.filter((employee) =>
        employee.employeeName.toLowerCase().includes(searchField.toLowerCase())
      )
    );
    setPage(1);
  }, [users, searchField]);

  const handleChangePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const start = (page - 1) * employeePerPage;
  const end = page * employeePerPage;
  const employees = filteredEmployees.slice(start, end);

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="employee-table-container">
      <SearchBox searchChange={handleSearchChange} />
      <div className="table-wrapper">
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Phone Number</th>
                <th className="table-header">CNP</th>
                <th className="table-header">ID</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((user, i) => (
                <Employee
                  key={i}
                  id={user._id}
                  name={user.employeeName}
                  phoneNumber={user.phoneNumber}
                  cnp={user.cnp}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handleChangePage}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(filteredEmployees.length / employeePerPage)}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-link"}
            nextLinkClassName={"pagination-link"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
