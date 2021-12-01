import { Card } from "react-bootstrap";

const MyTherapist = ({showTherapistDetails, therapist}) => {
    return(
        <div onClick={()=> showTherapistDetails()}>
           <Card className="d-flex flex-row">
               <img height="80" width="80"src={therapist.avatar}/>
               <div>{therapist.name} {therapist.surname}</div>
           </Card> 
        </div>
    )
}

export default MyTherapist