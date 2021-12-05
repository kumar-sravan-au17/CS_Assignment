import { useEffect, useState } from "react"


function ViewResponses(props) {

    const [responses, setResponses] = useState([])

    const pullResponses = async () => {
        const response = await fetch(`/api/survey/responses/${props.question}`)
        const data = await response.json()
        setResponses(data)
    }

    useEffect(() => {
        pullResponses()
    }, [])

    return(
        <div className="response-wrapper">
            <h1 className="border-bottom">{props.title}</h1>
            <div>
                {responses.map((r) => <div>
                    <h5 className="border-bottom">Name: {r.user}</h5>
                    <div>Responses :{r.responses.map((a) => <><p>{a.question}</p><br /><p>{a.answer}</p></>)}</div>
                </div>)}
            </div>
        </div>
    )
}

export default ViewResponses