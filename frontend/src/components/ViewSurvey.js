import { useState } from "react"
import ViewResponses from "./ViewResponses"

function ViewSurvey(props) {

    const [clicked, setClicked] = useState(false)

    const handleClicked = () => {
        if (clicked) {
            setClicked(false)
        }else{
            setClicked(true)
        }
    }

    const expiryTime = new Date(props.data.expiry).toLocaleString("en-UK")
    return(
        <div onClick={handleClicked} className="card border-dark shadow-sm p-3 me-3 mb-3 pointer">
            <h5>{props.data.title}</h5>
            <ul>
                {props.data.questions.map((q, index) => <li key={index}>{q.question}</li>)}
            </ul>
            <p className="form-text"> Expiry: {expiryTime} </p>
            {clicked && <ViewResponses question={props.data._id} title={props.data.title}/>}
        </div>
    )
}

export default ViewSurvey