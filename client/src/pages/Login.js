import React from 'react'

import { Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useAuth } from 'context/Auth.js'

const Login = () => (
    <> 
        <div className="login__title">
            Log In
        </div>
        <div className="login__container">
            <Form className="login__form">
                <FormGroup>
                    <Label form="inputEmail">Email ID</Label>
                    <Input type="email" name="inputEmail"/>
                </FormGroup>
                <FormGroup>
                    <Label form="inputPassword">Password</Label>
                    <Input type="password" name="inputPassword"/>
                </FormGroup>
                <div style={{textAlign: 'right'}}><Button color="primary">Log In</Button></div>
                <br/>
                <FormText color="muted">
                Don't have an account yet?
                Click <Link to="/register">here</Link> to sign up!
                </FormText>
            </Form>
        </div>
    </>
)

export default Login