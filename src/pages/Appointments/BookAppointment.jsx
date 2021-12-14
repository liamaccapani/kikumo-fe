import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

const BookApppointment = ({ history, location, match }) => {
  const token = localStorage.getItem("accessToken");
  const BASE_URL = process.env.REACT_APP_DEV_API_BE
  const [therapistInfo, setTherapistInfo] = useState({});
  // useLocation()
  //   const {therapist} = location.state
  const therapistDetails = async () => {
    // const id = therapist._id;
    try {
      const response = await fetch(
        BASE_URL +
          "/therapists/" +
          "61a7b509873352612a1eb60d",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTherapistInfo(data);
        return data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    therapistDetails();
  }, []);
  return (
    <Container>
      <Card>
        <div>{therapistInfo.name}</div>
        <div>{therapistInfo.surname}</div>
        <img
          alt="avatar"
          src={therapistDetails.avatar}
          height="80"
          width="80"
        />
      </Card>
      <Card>
        {therapistInfo.experiences.map((experience) => {
          return (
            <Card body key={experience._id}>
              <Card border="light" style={{ width: "18rem" }}>
                <Card.Header>{experience.role}</Card.Header>
                <Card.Body>
                  <Card.Title>{experience.startDate}</Card.Title>
                  <Card.Text>{experience.description}</Card.Text>
                  <Card.Text>{experience.area}</Card.Text>
                </Card.Body>
              </Card>
            </Card>
          );
        })}
      </Card>
    </Container>
  );
};

export default BookApppointment;
