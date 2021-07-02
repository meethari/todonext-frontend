import React, {useState} from 'react'
import axios from 'axios'
import { Alert, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from 'context/Auth.js'

const Register = () => {

    const {authTokens, setAuthTokens} = useAuth()

    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [inputPasswordRepeat, setInputPasswordRepeat] = useState("")

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

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

        if (inputPassword.localeCompare(inputPasswordRepeat) != 0) {
            setAlertMessage('Passwords do not match. Please re-enter your password exactly.')
            setAlertOpen(true)
            return false
        }
        
        return true
    }

    const submitForm = async () => {
        console.log(inputEmail, inputPassword, inputPasswordRepeat)

        if (!formValidate()) {
            return
        }
        
        try {
            const response = await axios.post('/register', {username: inputEmail, password: inputPassword})
            if (response.status == 200) {
            setAuthTokens(true)
            history.push('/')
            } 
        } catch (e) {
            setAlertMessage('An account already exists with that email ID. Please proceed to log in.')
            setAlertOpen(true)
        };
        
    }

    return (
        <> 
            <div className="login__alertcontainer">
                <Alert color='danger' isOpen={alertOpen} toggle={() => {setAlertOpen(false)}}>{alertMessage}</Alert>
            </div>
            <div className="register__title">
                Register
            </div>
            <div className="register__container">
                <Form className="register__form">
                    <FormGroup>
                        <Label form="inputEmail">Email ID</Label>
                        <Input type="email" name="inputEmail" value={inputEmail} onChange={(e) => {setInputEmail(e.target.value)}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label form="inputPassword">Password</Label>
                        <Input type="password" name="inputPassword" value={inputPassword} onChange={(e) => {setInputPassword(e.target.value)}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label form="inputPasswordRepeat">Password (again)</Label>
                        <Input type="password" name="inputPasswordRepeat" value={inputPasswordRepeat} onChange={(e) => {setInputPasswordRepeat(e.target.value)}}/>
                    </FormGroup>
                    <div style={{textAlign: 'right'}}><Button color="primary" onClick={submitForm}>Sign up</Button></div>
                    <br/>
                    <FormText color="muted">
                    Already have an account?
                    Click <Link to="/login">here</Link> to sign in.
                    </FormText>
                </Form>
            </div>
        </>
    )
}   
export default Register