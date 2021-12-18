### {
  /* <Container>
  <Row>
    <Col
      md={12}
      lg={6}
      className="profile-col"
      style={{ backgroundColor: "pink" }}
    >
      <Container>
        <div>{myData.name}</div>
        <div>{myData.surname}</div>
        <div>
          <img alt="avatar" src={myData.avatar} height="80" width="80" />
        </div>
      </Container>
    </Col>
    <Col className="utilities-col" style={{ backgroundColor: "orange" }}>
      <Card body>Search Therapist</Card>

      {!showAppointments && (
        <Card body id="appointments" onClick={() => showAppointmentsDetails()}>
          Appointments
        </Card>
      )}
      {showAppointments && (
        <MyAppointments
          onClick={() => showAppointmentsDetails()}
          showAppointmentsDetails={showAppointmentsDetails}
          appointments={myData.appointments}
        />
      )}

      {!showTherapist && (
        <Card body onClick={() => showTherapistDetails()}>
          My Therapist
        </Card>
      )}
      {showTherapist && (
        <MyTherapist
          onClick={() => showTherapistDetails()}
          showTherapistDetails={showTherapistDetails}
          therapist={myData.therapist}
        />
      )}
    </Col>
  </Row>
</Container>; */
}
// // Fx to pass down to the cards
// const showDetails = () => {
//   if(id === "appointments"){
//     setShowAppointments(!showAppointments)
//   } else {
//     showTherapist(!setShowTherapist)
//   }
// }

// const showAppointmentsDetails = () => {
//   setShowAppointments(!showAppointments);
// };

// const showTherapistDetails = () => {
//   setShowTherapist(!showTherapist);
// };
