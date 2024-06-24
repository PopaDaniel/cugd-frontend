import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Employee.css";

const Employee = ({ name, phoneNumber, cnp, id }) => {
  const navigate = useNavigate();

  const onUserClick = async (e) => {
    try {
      const id = e.target.parentElement.lastChild.innerText;
      const { data } = await axios.get(
        `https://casuta-ursitoarelor.onrender.com/employees/${id}`
      );

      return navigate(`/userprofile/${id}`, {
        state: data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr className="employee-row">
      <td className="employee-cell" onClick={onUserClick}>
        {name}
      </td>
      <td className="employee-cell">{phoneNumber}</td>
      <td className="employee-cell">{cnp}</td>
      <td className="employee-cell">{id}</td>
    </tr>
  );
};

export default Employee;
