import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

// therapist: { (coming from Profile)
//     avatar,
//     name,
//     surname,
//     _id
// }

const MyTherapist = ({ showTherapistDetails, therapist }) => {
  const show = () => {
    alert(therapist)
  }
  return (
    <>
      <Card>
        {/* <img
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
        <Button>
            Check Availability
        </Button>
        <CloseIcon onClick={() => showTherapistDetails()} /> */}
        <div onClick={show}>huuuhuuuu</div>
      </Card>
    </>
  );
};

export default MyTherapist;
