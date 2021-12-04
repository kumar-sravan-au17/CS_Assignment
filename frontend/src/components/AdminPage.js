import { useEffect, useState } from 'react'
import AddSurvey from './AddSurvey'
import { v4 as uuidv4 } from 'uuid';

function AdminPage() {

    const [clickedAdd, setClickedAdd] = useState(false)
    const [surveys, setSurveys] = useState([])

    const pullSurveys = async () => {
        const response = await fetch('/api/survey')
        const data = await response.json()
        setSurveys(data)
    }

    useEffect(() => {
        pullSurveys()
    }, [])

    return(
        <div className="admin-wrapper">
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'1em', width:"60%"}}>
                <h1 style={{display: 'inline'}}>Admin Page</h1>
                <button onClick={() => setClickedAdd(true)} className="btn btn-primary align-right mb-3">Add Survey</button>
            </div>
            <div className="admin-content">
                {clickedAdd && <AddSurvey closeFn={setClickedAdd} pullSurveys={pullSurveys} />}
            </div>
            <div className="survey-wrapper">
                {surveys.map((s) => <div key={uuidv4()} className="card border-dark shadow-sm p-3 me-3 mb-3">
                    <h5>{s.title}</h5>
                    <ul>
                        {s.questions.map((q, index) => <li key={index}>{q.question}</li>)}
                    </ul>
                    {/* <p>Survey Ends in : {}</p> */}
                    </div>)}
            </div>
        </div>
    )
}

export default AdminPage