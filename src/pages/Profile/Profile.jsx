import { useState, useEffect } from "react";

const Profile = ({ history, location, match }) => {
  const [meInfo, setMeInfo] = useState({});
  const getMe = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/clients/me",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const myData = await response.json();
        console.log(myData);
        setMeInfo(myData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(getMe, []);
  return (
    <>
      <h1>PROFILE</h1>
      <div>{meInfo.name}</div>
      <div>{meInfo.surname}</div>
      <div>
          <img src={meInfo.avatar} height="80" width="80"/>
      </div>
    </>
  );
};

export default Profile;
