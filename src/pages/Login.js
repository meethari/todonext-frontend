import React, {useState} from 'react'
import Api from 'utilities/api';

import { Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'context/Auth.js'
  

const Login = () => {

    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const {authTokens, setAuthTokens} = useAuth()
    const history = useHistory()

    const formValidate = () => {

        if (inputEmail === "") {
            setAlertMessage('Please enter an email ID.')
            setAlertOpen(true)
            return false
        }

        if (inputPassword === "") {
            setAlertMessage('Please enter a password.')
            setAlertOpen(true)
            return false
        }

        // TODO: add Regex email criteria
        return true
    }

    const submitForm = async () => {
        if (!formValidate()) {
            return
        }
    
        try {
            const api = new Api()
            const response = await api.post('/login', {username: inputEmail, password: inputPassword})
            if (response.status == 200) {
            setAuthTokens(true)
            history.push("/")
            } 
        } catch (e) {
            setAlertMessage('Invalid email ID and/or password. Please re enter your credentials.')
            setAlertOpen(true)
        };
        
    }

    return (
    <> 
        <div className="login__alertcontainer">
            <Alert color='danger' isOpen={alertOpen} toggle={() => {setAlertOpen(false)}}>{alertMessage}</Alert>
        </div>
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