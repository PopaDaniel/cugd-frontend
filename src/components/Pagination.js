// import "./Pagination.css";
// import { Component } from "react";
// import EmployeeTable from "../components/EmployeeTable/EmployeeTable";
// import ReactPaginate from "react-paginate";
// import SearchBox from "../components/SearchBox/SearchBox";

// class Pagination extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: props.users,
//       page: 1,
//       employeePerPage: 10,
//       searchField: "",
//       length: "",
//     };
//   }

//   onSearchChange = (e) => {
//     this.setState({
//       searchField: e.target.value,
//     });
//   };

//   onChangePage = ({ selected }) => {
//     this.setState({
//       page: selected + 1,
//     });
//   };

//   getSearchResults = () => {
//     const filteredEmployees = this.state.users.filter((employee) => {
//       return employee.name
//         .toLowerCase()
//         .includes(this.state.searchField.toLowerCase());
//     });
//     return filteredEmployees;
//   };

//   render() {
//     const start = (this.state.page - 1) * this.state.employeePerPage;
//     const end = this.state.page * this.state.employeePerPage;
//     const employeesArr = this.getSearchResults();
//     const employees = employeesArr.slice(start, end);
//     return (
//       <div>
//         <SearchBox searchChange={this.onSearchChange} />
//         <EmployeeTable users={employees} />
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="Next >"
//           onPageChange={this.onChangePage}
//           pageRangeDisplayed={5}
//           pageCount={Math.ceil(
//             employeesArr.length / this.state.employeePerPage
//           )}
//           previousLabel="< Previous"
//           renderOnZeroPageCount={null}
//           containerClassName={"navigationButtons"}
//           previousLinkClassName={"previousButton"}
//           nextLinkClassName={"nextButton"}
//           disabledClassName={"navigationDisabled"}
//           activeClassName={"navigationActive"}
//         />
//       </div>
//     );
//   }
// }

// export default Pagination;
