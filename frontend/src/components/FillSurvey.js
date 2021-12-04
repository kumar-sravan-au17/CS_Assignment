

function FillSurvey(props) {
    return(
        <form className="card shadow p-4 w-50">
            <h2 className="display-5 pb-2 border-bottom">{props.currentSurvey[0].title}</h2>
            {props.currentSurvey[0].questions.map((q, index) => <div key={index} className="mb-3">
                <label htmlFor={q.id} className="form-label">{q.question}</label>
                <input type="text" className="form-control" id={q.id}/>
            </div>)}
            <div>
                <button type="submit" className="btn btn-primary w-25">Submit</button>
            </div>
        </form>
    )
}

export default FillSurvey