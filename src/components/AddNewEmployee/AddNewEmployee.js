import React, { useState } from "react";
import axios from "axios";
import "./AddNewEmployee.css"; // Importing the custom CSS file

const AddNewEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnp, setCnp] = useState("");
  const [files, setFiles] = useState([]);

  const getEmployeeFullName = (e) => setEmployeeName(e.target.value);
  const getEmployeeNumber = (e) => setPhoneNumber(e.target.value);
  const getEmployeeCnp = (e) => setCnp(e.target.value);
  const getEmployeeFiles = (e) => setFiles(Array.from(e.target.files));

  const addNewEmployee = async () => {
    try {
      const formData = new FormData();
      const employeeNameTrimmed = employeeName.trim();
      const phoneNumberTrimmed = phoneNumber.trim();
      const cnpTrimmed = cnp.trim();

      formData.append("employeeName", employeeNameTrimmed);
      formData.append("phoneNumber", phoneNumberTrimmed);
      formData.append("cnp", cnpTrimmed);
      files.forEach((file, index) => {
        formData.append("files", file);
      });

      await axios.post("https://cugd-api.vercel.app/addNewEmployee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error(err);
    }

    setEmployeeName("");
    setPhoneNumber("");
    setCnp("");
    setFiles([]);
    window.location.reload();
  };

  return (
    <div className="form-container">
      <main className="form-content">
        <fieldset className="form-fieldset">
          <legend className="form-legend">Add New Employee</legend>
          <div className="form-group">
            <label className="form-label" htmlFor="employee-name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              name="employee-name"
              id="employee-name"
              value={employeeName}
              onChange={getEmployeeFullName}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="employee-mobil-number">
              Phone Number
            </label>
            <input
              className="form-input"
              type="text"
              name="employee-mobil-number"
              id="employee-mobil-number"
              value={phoneNumber}
              onChange={getEmployeeNumber}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="employee-cnp">
              CNP
            </label>
            <input
              className="form-input"
              type="text"
              name="employee-cnp"
              id="employee-cnp"
              value={cnp}
              onChange={getEmployeeCnp}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="employee-files">
              Select Files
            </label>
            <input
              className="form-input"
              type="file"
              id="employee-files"
              name="files"
              multiple
              onChange={getEmployeeFiles}
            />
          </div>
        </fieldset>
        <div className="form-submit-container">
          <button onClick={addNewEmployee} className="form-submit">
            Add
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddNewEmployee;
