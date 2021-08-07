import React, {useState} from 'react'
import { Jumbotron, Container, Button, Row, Col } from 'reactstrap'
import { useHistory } from "react-router-dom";
import Footer from 'components/Footer/Footer'
import "./Splash.scss"
import img_office_worker from 'assets/office_worker.jpeg'
import noun_papers from 'assets/noun_papers.png'
import noun_task_list from 'assets/noun_task_list.png'

const Splash = () => {

    const history = useHistory();

    const ctaClickHandler = () => {
        history.push("/register")
    }

    return (
        <div className="splash-page">
            <Jumbotron className="splash-hero">
                <Container className="splash-hero-container">
                    <h1>Your personal task management solution.</h1>
                    <img src={img_office_worker} className="splash-hero-image mt-3 mb-4" alt="Office Worker"/><br/>
                    <Button color="primary" size="lg" className="splash-hero-cta" onClick={ctaClickHandler}>Sign up</Button>
                </Container>
            </Jumbotron>
            <Jumbotron className="splash-features">
                <Container>
                    <h2>Features</h2>
                    <Row className="splash-features-row">
                        <Col sm="4" className="splash-features-imgcol">
                            <img src={noun_task_list} className="splash-features-img" alt="Task List"/>
                        </Col>
                        <Col sm="8" className="splash-features-textcol">
                            <h4>Create tasks, mark tasks as done to track what needs to get done.</h4>
                        </Col>
                    </Row>
                    <Row className="splash-features-row">
                        <Col sm="4" className="splash-features-imgcol">
                            <img src={noun_papers} className="splash-features-img" alt="Multiple Lists"/>
                        </Col>
                        <Col sm="8" className="splash-features-textcol">
                            <h4>Create multiple lists to organize your tasks.</h4>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Footer/>
        </div>
    )
}

export default Splash