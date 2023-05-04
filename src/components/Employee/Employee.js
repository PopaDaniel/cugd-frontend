//import { robots } from "./../../robots";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Employee = ({ name, phoneNumber, cnp, id }) => {
  const navigate = useNavigate();

  const onUserClick = async (e) => {
    const id = e.target.parentElement.lastChild.innerText;
    const { data } = await axios.get(`http://localhost:3001/employees/${id}`);

    return navigate(`/userprofile/${id}`, {
      state: data,
    });
  };

  return (
    <tr className="tc stripe-dark">
      <td className="pa3" onClick={onUserClick} style={{ cursor: "pointer" }}>
        {name}
      </td>
      <td className="pa3">{phoneNumber}</td>
      <td className="pa3">{cnp}</td>
      <td className="pa3">{id}</td>
    </tr>
  );
};

export default Employee;
