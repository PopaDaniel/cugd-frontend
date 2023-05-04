import { Component } from "react";
import axios from "axios";

class AddNewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: "",
      phoneNumber: "",
      cnp: "",
      img: "",
    };
  }

  getEmployeeFullName = (e) => {
    this.setState({
      employeeName: e.target.value,
    });
  };

  getEmployeeNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value,
    });
  };

  getEmployeeCnp = (e) => {
    this.setState({
      cnp: e.target.value,
    });
  };

  getEmployeeImg = (e) => {
    this.setState({
      img: e.target.files[0],
    });
  };

  addNewEmployee = async () => {
    try {
      const formData = new FormData();
      const employeeName = this.state.employeeName.trim();
      const phoneNumber = this.state.phoneNumber.trim();
      const cnp = this.state.cnp.trim();
      const img = this.state.img;

      formData.append("employeeName", employeeName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("cnp", cnp);
      formData.append("img", img);

      await axios.post(
        "https://casutaursitoarelor-api.onrender.com/addNewEmployee",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (err) {
      console.error(err);
    }

    document.getElementById("employee-name").value = "";
    document.getElementById("employee-mobil-number").value = "";
    document.getElementById("employee-image").value = "";
    document.getElementById("employee-cnp").value = "";

    window.location.reload();
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Add New Employee</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="employee-name">
                  Name
                </label>
                <input
                  className="pa2 input-reset w-100"
                  type="text"
                  name="employee-name"
                  id="employee-name"
                  onChange={this.getEmployeeFullName}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="text">
                  Phone Number
                </label>
                <input
                  className="pa2 input-reset w-100"
                  type="text"
                  name="employee-mobil-number"
                  id="employee-mobil-number"
                  onChange={this.getEmployeeNumber}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="text">
                  CNP
                </label>
                <input
                  className="pa2 input-reset w-100"
                  type="text"
                  name="employee-cnp"
                  id="employee-cnp"
                  onChange={this.getEmployeeCnp}
                />
              </div>
              <div className="mv3">
                <label className="pa2 input-reset" htmlFor="img">
                  Select image:
                </label>
                <input
                  alt="profile-pic"
                  type="file"
                  id="employee-image"
                  name="img"
                  accept="image/*"
                  onChange={this.getEmployeeImg}
                />
              </div>
            </fieldset>

            <div className="tc">
              <input
                onClick={() => this.addNewEmployee()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Add"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default AddNewEmployee;
