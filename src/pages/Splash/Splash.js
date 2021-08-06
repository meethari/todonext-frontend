import React, {useState} from 'react'
import { Jumbotron, Container, Button, Row, Col } from 'reactstrap'
import { useHistory } from "react-router-dom";
import SiteNavbar from 'components/SiteNavbar'
import "./Splash.scss"
import img_office_worker from 'assets/office_worker.jpeg'

const Splash = () => {

    const history = useHistory();

    const ctaClickHandler = () => {
        history.push("/register")
    }

    return (
        <div className="splash-page">
            <SiteNavbar/>
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
                    <Row>

                    </Row>
                    <Row>

                    </Row>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Splash