import React, {useState} from 'react'
import axios from 'axios'

import { Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'context/Auth.js'

const Login = () => {

    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const {authTokens, setAuthTokens} = useAuth()
    const history = useHistory()

    const formValidate = () => {
        if (inputPassword === "") {
            return false
        }

        // TODO: add other validation criteria. Regex email for instance.
        return true
    }

    const submitForm = async () => {
        if (!formValidate()) {
            alert('Details in this form may be filled incorrectly.')
            return
        }
    
        try {
            const response = await axios.post('/login', {username: inputEmail, password: inputPassword})
            if (response.status == 200) {
            setAuthTokens(true)
            history.push("/")
            } 
        } catch (e) {
            // Todo: replace this with a react alert
            alert('Error')
            console.log(e)
        };
        
    }

    return (
    <> 
        <div className="login__title">
            Log In
        </div>
        <div className="login__container">
            <Form className="login__form">
                <FormGroup>
                    <Label form="inputEmail">Email ID</Label>
                    <Input type="email" name="inputEmail" value={inputEmail} onChange={(e) => {setInputEmail(e.target.value)}}/>
                </FormGroup>
                <FormGroup>
                    <Label form="inputPassword">Password</Label>
                    <Input type="password" name="inputPassword" value={inputPassword} onChange={(e)=>{setInputPassword(e.target.value)}}/>
                </FormGroup>
                <div style={{textAlign: 'right'}}><Button color="primary" onClick={submitForm}>Log In</Button></div>
                <br/>
                <FormText color="muted">
                Don't have an account yet?
                Click <Link to="/register">here</Link> to sign up!
                </FormText>
            </Form>
        </div>
    </>
    )
}

export default Login