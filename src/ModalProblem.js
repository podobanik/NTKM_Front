import {Fragment, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import ProblemForm from "./ProblemForm";

const ModalProblem = (props) => {
    const [visible, setVisible] = useState(false)
    var button = <Button onClick={() => toggle()}>Редактировать</Button>;

    const toggle = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={() => toggle()}
                style={{minWidth: "200px"}}>
                Добавить задачу
            </Button>
        )
    }
    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader
                    style={{justifyContent: "center"}}>{props.create ? "Добавить задачу" : "Редактировать задачу"}</ModalHeader>
                <ModalBody>
                    <ProblemForm
                        problem={props.problem ? props.problem : []}
                        resetState={props.resetState}
                        toggle={toggle}
                        newProblem={props.newProblem}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}
export default ModalProblem;