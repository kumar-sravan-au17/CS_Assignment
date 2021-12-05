import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../App"

function Login() {

    const contextValue = useContext(UserContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let obj = {
            email: email,
            password: password
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {'Content-type' : 'application/json'}
            })
            if (response.status === 200) {
                const data = await response.json()
                contextValue.setLoggedIn(true)
                contextValue.setUserId(data.userId)
                contextValue.setUserName(data.userName)
                contextValue.setRole(data.role)

                localStorage.setItem('loggedIn', true)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('userName', data.userName)
                localStorage.setItem('role', data.role)

                if (data.role === "admin") {
                    navigate('/admin')
                } else {
                    navigate('/user')
            }
            }
            if (response.status === 401) {
                alert('Invalid Password')
            }else if (response.status === 400) {
                alert('This email is not Signed Up. Please Signup')
            }
            
        } catch (error) {
            console.error(error);
        }
        
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