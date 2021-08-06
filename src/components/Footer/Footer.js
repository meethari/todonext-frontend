import React from 'react'
import { Col, Row, Container } from 'reactstrap'
import './Footer.scss'

const Footer = () => (
    <div className="footer">
        <Container>
            <Row>
                <Col>
                    <h3>ToDoNext</h3>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>About ToDoNext</h4>
                    <p>GitHub Repo: <a href="https://github.com/meethari/todonext-frontend" target="_blank" rel="noopener noreferrer">ToDoNext Frontend Repo</a></p>
                    <p>Author: <a href="https://github.com/meethari/" target="_blank" rel="noopener noreferrer">meethari</a></p>
                </Col>
                <Col>
                    <h4>Credit for assets</h4>
                    <p><a href="https://thenounproject.com/term/task-list-paper/450959/">task list paper</a> by Rockicon from <a href="https://thenounproject.com/">the Noun Project</a></p>
                    <p><a href="https://thenounproject.com/term/papers/99704/">papers</a> Clayton Meador from <a href="https://thenounproject.com/">the Noun Project</a></p>
                </Col>
            </Row>
        </Container>
    </div>
)

export default Footer