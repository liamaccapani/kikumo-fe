import { Card } from "react-bootstrap";

const MyTherapist = ({showTherapistDetails, therapist}) => {
    return(
        <div onClick={()=> showTherapistDetails()}>
           <Card className="d-flex justify-content-start">
               <img src={therapist.avatar}/>
               <div>{therapist.name} {therapist.surname}</div>
           </Card> 
        </div>
    )
}

export default MyTherapist