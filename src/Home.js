import {Container, Row, Col} from "reactstrap";
import ListProblems from "./ListProblems";
import axios from "axios";
import {useEffect, useState} from "react";
import ModalProblem from "./ModalProblem";
import {API_URL_PROBLEMS} from "./App";

const Home = () => {
    const [problems, setProblems] = useState([])

    useEffect(()=>{
        getProblems()
    },[])

    const getProblems = (data)=>{
        axios.get(API_URL_PROBLEMS).then(data => setProblems(data.data))
    }

    const resetState = () => {
        getProblems();
    };

    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ListProblems problems={problems} resetState={resetState} newProblem={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalProblem
                    create={true}
                    resetState={resetState}
                    newProblem={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;