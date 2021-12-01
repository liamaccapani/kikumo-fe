import { Card } from "react-bootstrap";

const MyAppointments = ({ showAppointmentsDetails, appointments }) => {
  return (
    <div onClick={() => showAppointmentsDetails()}>
      {appointments.map((appointment) => {
        return (
          <Card>
            <Card body>
                {appointment}
            </Card>
          </Card>
        );
      })}
    </div>
  );
};

export default MyAppointments;
