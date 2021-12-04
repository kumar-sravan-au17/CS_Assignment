import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import FillSurvey from './FillSurvey';

function UserPage() {

    const [surveys, setSurveys] = useState([])
    const [currentSurvey, setCurrentSurvey] = useState('')

    const pullSurveys = async () => {
        const response = await fetch('/api/survey')
        const data = await response.json()
        setSurveys(data)
    }

    const handleSurveyClick = async (id) => {
        const response = await fetch(`/api/survey/${id}`)
        const data = await response.json()
        setCurrentSurvey(data)
    }

    useEffect(() => {
        pullSurveys()
    }, [])

    return(
        <div className="admin-wrapper">
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'1em', width:"60%"}}>
                <h1 style={{display: 'inline'}}>User Page</h1>
            </div>
            <div className="survey-wrapper">
                {surveys.map((s) => <div onClick={() => handleSurveyClick(s._id)} key={uuidv4()} className="card pointer border-dark shadow-sm p-3 me-3 mb-3">
                    <h5>{s.title}</h5>
                    </div>)}
            </div>  
            {currentSurvey && <FillSurvey currentSurvey={currentSurvey} />}
        </div>
    )
}

export default UserPage