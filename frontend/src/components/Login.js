import { useState } from "react"
// import { useNavigate } from 'react-router-dom'

function Login() {

    // const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let obj = {
            email: email,
            password: password
        }
        await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-type' : 'application/json'}
        })
        // navigate('/admin')
    }

    return(
        <div className="main-wrapper">
            <form onSubmit={handleSubmit} className="border rounded border-grey shadow p-3 mb-3" style={{width: "35%"}}>
                <h2 className="display-6 mb-3 border-bottom pb-3">Login</h2>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"/>
                    <label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary me-4">Login</button>
                <a href="/">Sign Up</a>
            </form>
        </div>
    )
}

export default Login