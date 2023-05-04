import { useLocation } from "react-router-dom";

const EmployeeProfile = () => {
  const { state: userData } = useLocation();

  return (
    <div className="tc profile">
      <div className="title">
        <h2 className="ma3">Profile</h2>
      </div>

      <div className="profile-contanier">
        {[userData.img]?.map((obj, i) => {
          const base64String = btoa(
            new Uint8Array(userData.img.data.data).reduce(function (
              data,
              byte
            ) {
              return data + String.fromCharCode(byte);
            },
            "")
          );
          return (
            <img
              className="mb2 v-mid br-100"
              src={`data:image/png;base64,${base64String}`}
              alt="img"
              style={{ width: "370px", height: "370px" }}
              key={i}
            />
          );
        })}

        <div className="profile-details">
          <p>Full Name:</p>
          <h3>{userData.employeeName}</h3>

          <p>Phone Number:</p>
          <h3>{userData.phoneNumber}</h3>

          <p>Cnp:</p>
          <h3>{userData.cnp}</h3>
        </div>
      </div>
    </div>
  );
};
export default EmployeeProfile;
