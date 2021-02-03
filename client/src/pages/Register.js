import React from 'react'

import { Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { Link } from 'react-router-dom'

const Register = () => (
    <> 
        <div className="register__title">
            Register
        </div>
        <div className="register__container">
            <Form className="register__form">
                <FormGroup>
                    <Label form="inputEmail">Email ID</Label>
                    <Input type="email" name="inputEmail"/>
                </FormGroup>
                <FormGroup>
                    <Label form="inputPassword">Password</Label>
                    <Input type="password" name="inputPassword"/>
                </FormGroup>
                <FormGroup>
                    <Label form="inputPasswordRepeat">Password (again)</Label>
                    <Input type="password" name="inputPasswordRepeat"/>
                </FormGroup>
                <div style={{textAlign: 'right'}}><Button color="primary">Sign up</Button></div>
                <br/>
                <FormText color="muted">
                Already have an account?
                Click <Link to="/login">here</Link> to sign in.
                </FormText>
            </Form>
        </div>
    </>
)

export default Register