import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";


function FillSurvey(props) {

    const contextValue = useContext(UserContext)

    const [questions, setQuestions] = useState(props.currentSurvey[0].questions)

    const [displayTimer, setDisplayTimer] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    const expiryTime = new Date(props.currentSurvey[0].expiry).getTime()

    const handleInputChange = (id, event) => {
        const new_questions = questions.map(i => {
            if (id === i.id) {
                i.answer = event.target.value 
            }
            return i
        })
        setQuestions(new_questions)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            user: contextValue.userName,
            userId: contextValue.userId,
            responses: questions,
            questionId: props.currentSurvey[0]._id
        }
        console.log(obj);
        let response = await fetch('/api/survey/responses', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-type' : 'application/json'}
        })
        if (response.status === 200) {
            alert('Response Submitted!')
            handleClose()
        }else {
            alert('Something went wrong!')
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = expiryTime - now

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            if (distance < 0) {
                setDisplayTimer('Expired')
                setIsDisabled(true)
                clearInterval(timer)
            } else {
                setDisplayTimer(`${days}d ${hours}h ${minutes}m ${seconds}s `)
            }
        }, 10)
    }, [expiryTime])


    const handleClose = () => {
        props.setCurrentSurvey('')
    }

    return(
        <form onSubmit={handleSubmit} className="card position-fixed shadow p-4 w-50">
            <div className="d-flex justify-content-between pb-2 mb-3 border-bottom">
                <h2 className="display-5">{props.currentSurvey[0].title}</h2>
                <div className="pt-3 pointer" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                    </svg>
                </div>
            </div>
            <div style={{maxHeight : "60vh", overflow: "auto"}}>
                {questions.map((q) => <div key={q.id} className="mb-3">
                    <label htmlFor={q.id} className="form-label">{q.question}</label>
                    <input type="text" value={q.answer} name={q.question} onChange={e => handleInputChange(q.id, e)} className="form-control" id={q.id}/>
                </div>)}
            </div>
            <div className="d-flex justify-content-between align-items-center">
                {isDisabled ? <button type="submit" className="btn btn-secondary w-25" disabled>Submit</button> : <button type="submit" className="btn btn-primary w-25">Submit</button>}
                <p className="form-text">Expires In: {displayTimer && displayTimer} </p>
            </div>
        </form>
    )
}

export default FillSurvey