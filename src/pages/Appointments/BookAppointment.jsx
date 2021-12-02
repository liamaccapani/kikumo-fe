import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookApppointment = ({ history, location, match }) => {
  const therapistProfile = async () => {
    // const id = therapist._id;
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        process.env.REACT_APP_DEV_API_BE + "/therapists/" + "61a7b509873352612a1eb60d",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    therapistProfile();
  }, []);
  return <div>BOOK APPOINTMENT</div>;
};

export default BookApppointment;
