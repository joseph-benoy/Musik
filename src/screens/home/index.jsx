import { Col, Container, Row,Tab,Nav } from "react-bootstrap";
import { FileEarmarkPlusFill, GearFill, HeartFill, MusicNoteList } from "react-bootstrap-icons";
import Player from "../../layouts/Player";
import Add from "./Add";
import "./home.css";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import All from "./All";
import Fav from "./Fav";
function Home() {
    const state = useSelector((state)=>state.player)
    const dispatch = useDispatch();
    return ( 
        <Container fluid className="base">
            <Row>
                <Col>
                <Tab.Container  defaultActiveKey="add">
                    <Row>
                        <Col lg={2} sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="add"><FileEarmarkPlusFill/>Add song</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="all"><MusicNoteList/>All songs</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fav"><HeartFill/>Favorates</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="settings"><GearFill/>Settings</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={10} sm={9}>
                            <Row className="contentRow">
                                <Col>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="add">
                                            <Add/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="all">
                                            <All/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fav">
                                            <Fav/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="settings">
                                            settings
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                            <Row className="playerRow">
                                <Col>
                                    <Player/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
     );
}

export default Home;