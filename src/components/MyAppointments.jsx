import { Card } from "react-bootstrap";

// appointment: {
//   startDate,
//   endDate,
//   description
// }

const MyAppointments = ({ showAppointmentsDetails, appointments }) => {
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
              {appointment.endDate}
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
