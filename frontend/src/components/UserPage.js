import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../App';
import FillSurvey from './FillSurvey';
import { useNavigate } from 'react-router-dom'

function UserPage() {

    const navigate = useNavigate()
    const contextValue = useContext(UserContext)

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

    const handleLogout = () => {
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        contextValue.setLoggedIn(false)
        contextValue.setUserId('')
        contextValue.setUserName('')
        contextValue.setRole('')
        navigate('/')
    }

    useEffect(() => {
        pullSurveys()
        if (contextValue.role !== "user" || contextValue.loggedIn !== true) {
            alert("Access Denied, Please Login!")
            navigate('/login')
        }
    }, [contextValue, navigate])

    return(
        <div className="admin-wrapper">
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'1em', width:"60%"}}>
                <h1 style={{display: 'inline'}}>User Page</h1>
                <button onClick={handleLogout} className="btn btn-primary align-right mb-3">Logout</button>
            </div>
            <div className="survey-wrapper">
                {surveys.map((s) => <div onClick={() => handleSurveyClick(s._id)} key={uuidv4()} className="card pointer border-dark shadow-sm p-3 me-3 mb-3">
                    <h5>{s.title}</h5>
                    </div>)}
            </div>
                {currentSurvey && <FillSurvey currentSurvey={currentSurvey} setCurrentSurvey={setCurrentSurvey} />}
        </div>
    )
}

export default UserPage