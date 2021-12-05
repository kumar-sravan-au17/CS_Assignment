import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import AddSurvey from './AddSurvey'
import ViewSurvey from './ViewSurvey';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../App';


function AdminPage() {

    const navigate = useNavigate()
    const contextValue = useContext(UserContext)

    const [clickedAdd, setClickedAdd] = useState(false)
    const [surveys, setSurveys] = useState([])

    const pullSurveys = async () => {
        const response = await fetch('/api/survey')
        const data = await response.json()
        setSurveys(data)
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
        let role = contextValue.role || localStorage.getItem('role')
        let loggedIn = contextValue.loggedIn || localStorage.getItem("loggedIn")
        if (role !== "admin" || loggedIn !== true) {
            alert("Access Denied, Please Login!")
            navigate('/login')
        }
    }, [contextValue, navigate])

    return(
        <div className="admin-wrapper">
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'1em', width:"60%"}}>
                <h1 style={{display: 'inline'}}>Admin Page</h1>
                <div>
                    <button onClick={() => setClickedAdd(true)} className="btn btn-primary align-right me-2 mb-3">Add Survey</button>
                    <button onClick={handleLogout} className="btn btn-primary align-right mb-3">Logout</button>
                </div>
            </div>
            <div className="admin-content">
                {clickedAdd && <AddSurvey closeFn={setClickedAdd} pullSurveys={pullSurveys} />}
            </div>
            <div className="survey-wrapper">
                {surveys.map((s) => <ViewSurvey data={s} key={uuidv4()}/>)}
            </div>
        </div>
    )
}

export default AdminPage