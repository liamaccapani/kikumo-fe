import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

// appointment: {
//   startDate,
//   endDate,
//   description
// }

const MyAppointments = ({ appointments, showAppointmentsDetails }) => {
  return (
    <div onClick={() => showAppointmentsDetails()}>
      {appointments.map((appointment) => {
        return (
          <Card body key={appointment._id}>
            <Card>
              Date and Time:
              {appointment.startDate}
            </Card>
            <Card>
              {appointment.duration}
            </Card>
            <Card>
              Description:
              {appointment.description}
            </Card>
          </Card>
        );
      })}
    </div>
  );
};

export default MyAppointments;
