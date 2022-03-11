import React from "react";
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    return(
        <Container>
            <Row>
                <Col className="text-center py-3">Made with <span style={{color: 'red', fontSize: '20px', margin: 5}}>♥</span> in India</Col>
            </Row>
        </Container>
    )
};

export default Footer;
