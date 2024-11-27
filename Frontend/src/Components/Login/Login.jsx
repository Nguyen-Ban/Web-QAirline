//import React from 'react'
import axios from 'axios'

const Login = () => {
    const getLoginData=async()=> {
        alert('clicked')
        await axios.get('/api/tables')
        .then(response=> {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="loginPage">
            <h1>Login</h1>
            <button onClick={getLoginData}>Click</button>
            <br></br>
            <br></br>
            <br></br>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
            <p>This is the Login page</p>
        </div>
    )
}

export default Login