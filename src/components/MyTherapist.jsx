import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// therapist: {
//     avatar,
//     name,
//     surname,
//     _id
// }

const MyTherapist = ({ showTherapistDetails, therapist }) => {
//   const therapistProfile = async () => {
//     const id = therapist._id;
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await fetch(
//         process.env.REACT_APP_DEV_API_BE + "/therapists/" + id,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <>
      <Card>
        <img
          alt="avatar"
          height="80"
          width="80"
          src={therapist.avatar}
        //   onClick={() => therapistProfile()}
        />
        <div>
          {therapist.name} {therapist.surname}
        </div>
        <Link to="/bookAppointment"
          state={{therapist}}
        >
          <Button>Book an Appointment</Button>
        </Link>
        <div onClick={() => showTherapistDetails()}>X</div>
      </Card>
    </>
  );
};

export default MyTherapist;
