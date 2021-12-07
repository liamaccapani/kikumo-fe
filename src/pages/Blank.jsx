import { useState, useEffect } from "react";
import format from "date-fns/format";

const Blank = ({ history, location, match }) => {
  const [myData, setMyData] = useState({});
  const [myAppointments, setMyAppointments] = useState([]);
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
        const data = await response.json();
        console.log(data);
        setMyData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getMyAppointments = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/sessions/clients",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const appointments = await response.json();
        setMyAppointments(appointments);
        console.log(appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
    getMyAppointments();
  }, []);
  return (
    <div>
      {myAppointments.map((appointment) => {
        return (
          <>
            <div>{format(new Date(2021, 7, 12), "yyyy-MM-dd")}</div>
            {/* <div>{format((appointment.startDate), "yyyy-MM-dd")}</div> */}
          </>
        );
      })}
    </div>
  );
};

export default Blank;
