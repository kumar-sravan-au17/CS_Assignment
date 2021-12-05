import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Main() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let obj = {
            name: name,
            email: email,
            gender: gender,
            role: role,
            dob: dob,
            password: password
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {'Content-type' : 'application/json'}
            })
            if (response.status === 400) {
                alert('Email Already Exists!')
            }else if (response.status === 200) {
                alert('Successfully Signed Up, Please Login')
                navigate('/login')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="main-wrapper">
            <form onSubmit={handleSubmit} className="border rounded border-grey shadow p-3 mb-3" style={{width: "35%"}}>
                <h2 className="display-6 mb-3 border-bottom pb-3">Signup</h2>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" className="form-control" id="floatingName" placeholder="Name"/>
                    <label htmlFor="floatingName">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"/>
                    <label htmlFor="floatingEmail">Email address</label>
                </div>
                <select onChange={(e)=>{setGender(e.target.value)}} value={gender} className="form-select mb-3" aria-label="Default select example">
                    <option defaultValue >Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <select onChange={(e)=>{setRole(e.target.value)}} value={role} className="form-select mb-3" aria-label="Default select example">
                    <option defaultValue >Role</option>
                    <option value="user">User</option>
                    <option value="admin">Co-ordinater</option>
                </select>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{setDob(e.target.value)}} value={dob} type="date" className="form-control" id="floatingDob" placeholder="Date of Birth"/>
                    <label htmlFor="floatingDob">Date of Birth</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary me-4">Sign Up</button>
                <a href="/login">Already Signed Up? Login Instead</a>
            </form>
        </div>
    )
}

export default Main