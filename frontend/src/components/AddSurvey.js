import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';


function AddSurvey(props) {

    const [questions, setQuestions] = useState([
        {id: uuidv4(), question: '', answer: ''}
    ])

    const [title, setTitle] = useState('')
    const [expiry, setExpiry] = useState('')

    const handleInputChange = (id, event) => {
        const new_questions = questions.map(i => {
            if (id === i.id) {
                i.question = event.target.value 
            }
            return i
        })
        setQuestions(new_questions)
    }
    
    const handleAdd = (e) => {
        e.preventDefault()
        setQuestions([...questions, { id: uuidv4(), question: '', answer: ''}]);
    }
    const handleRemove = (e) => {
        e.preventDefault()
        const items = questions;
        if (items.length > 0) {
          const lastIndex = items.length - 1;
          setQuestions(items.filter((item, index) => index !== lastIndex));
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let obj = {
            title: title,
            expiry: expiry,
            questions: questions
        }
        if (obj.questions.length === 1 && obj.questions[0].question === '') {
            return alert("Question can't be empty" )
        }
        let response = await fetch('/api/survey', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-type' : 'application/json'}
        })
        if (response.status === 200) {
            alert('Survey Submitted!')
            props.closeFn(false)
            props.pullSurveys()
        }else {
            alert('Something went wrong!')
        }
    }

    return(
        <form onSubmit={handleSubmit} className="card border-dark p-3 shadow-lg rounded">
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control border-dark form-control-lg mb-2" type="text" placeholder="Enter Title of the Survey"/>
            <div className="d-flex justify-content-around border-bottom pb-2 mb-3 border-dark">
                <label htmlFor="datetime">Valid till</label>
                <input value={expiry} id="datetime" onChange={(e)=>{setExpiry(e.target.value)}} className="form-control-sm border" type="datetime-local" />
            </div>
            <div className="mb-3 border-bottom pb-2 overflow-auto" style={{maxHeight:"50vh"}}>
                {questions.map((q) => 
                    <input key={q.id} value={q.question} onChange={e => handleInputChange(q.id, e)} name="question" className="form-control mb-2" type="text" placeholder="Enter Question"/>
                )}
            </div>
            <div>
                <button className="btn btn-outline-secondary me-4" onClick={handleAdd}>Add Question</button>
                <button className="btn btn-outline-secondary me-4" onClick={handleRemove}>Remove Question</button>
                <button onClick={() => props.closeFn(false)} type="button" className="btn btn-outline-danger me-1">Close</button>
                <button type="submit" className="btn btn-outline-info">Submit</button>
            </div>
        </form>
    )
}

export default AddSurvey