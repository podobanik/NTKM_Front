import {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL_PROBLEMS} from "./App";

const ProblemForm = (props) => {
    const [problem, setProblem] = useState({})
    //const [users, setUsers] = useState({})
    //const [problem_status_all, setProblemStatusAll] = useState([])
    //const [problem_type_all, setProblemTypeAll]= useState([])
    //const [objects_of_work, setObjectsOfWork]= useState([])

    const onChange = (e) => {
        const newState = problem
        if (e.target.name === "file") {
            newState[e.target.name] = e.target.files[0]
        } else newState[e.target.name] = e.target.value
        setProblem(newState)
    }


    useEffect(() => {
        if (!props.newProblem) {
            setProblem(problem => props.problem)
        }
        // eslint-disable-next-line
    }, [props.problem])

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }

    const submitDataEdit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const result = await axios.put(API_URL_PROBLEMS + problem.pk, problem, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            problem_text: problem['problem_text'],
            user: problem['user'],
            problem_type: problem['problem_type'],
            problem_status: problem['problem_status'],
            object_of_work: problem['object_of_work'],
            control_date: problem['control_date']
        }
        // eslint-disable-next-line
        const result = await axios.post(API_URL_PROBLEMS, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    return (
        <Form onSubmit={props.newProblem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="problem_text">Название задачи:</Label>
                <Input
                    type="text"
                    name="problem_text"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.problem_text)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="userSelect">
                    Ответственный сотрудник
                </Label>
                <Input
                    id="userSelect"
                    name="select"
                    type="select"
                >
                    <option>
                        1
                    </option>
                    <option>
                        2
                    </option>
                    <option>
                        3
                    </option>
                    <option>
                        4
                    </option>
                    <option>
                        5
                    </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="problem_type">Категория задачи:</Label>
                <Input
                    type="select"
                    name="problem_type"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.problem_type)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="problem_status">Статус задачи:</Label>
                <Input
                    type="text"
                    name="problem_status"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.problem_status)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="object_of_work">Объект АСУТП:</Label>
                <Input
                    type="text"
                    name="object_of_work"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.object_of_work)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="control_date">Контрольный срок:</Label>
                <Input
                    type="date"
                    name="control_date"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(problem.control_date)}
                />
            </FormGroup>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button>Подтвердить</Button> <Button onClick={props.toggle}>Отменить</Button>
            </div>
        </Form>
    )
}

export default ProblemForm;