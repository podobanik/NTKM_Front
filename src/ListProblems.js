import {Table} from "reactstrap";
import ModalProblem from "./ModalProblem";
import AppRemoveProblem from "./appRemoveProblem.js";


const ListProblems = (props) => {
    const {problems} = props
    return (
        <Table dark>
            <thead>
            <tr>
                <th>Задача</th>
                <th>Сотрудник</th>
                <th>Категория задачи</th>
                <th>Статус задачи</th>
                <th>Объект АСУТП</th>
                <th>Контрольный срок</th>
                <th>Дата добавления</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {!problems || problems.length <= 0 ? (
                <tr>
                    <td colSpan="6" align="center">
                        <b>Пока ничего нет</b>
                    </td>
                </tr>
            ) : Array.isArray(problems) && problems?.map(problem => (
                    <tr key={problem.pk}>
                        <td>{problem.problem_text}</td>
                        <td>{problem.user_id}</td>
                        <td>{problem.problem_type_id}</td>
                        <td>{problem.problem_status_id}</td>
                        <td>{problem.object_of_work_id}</td>
                        <td>{problem.control_date}</td>
                        <td>{problem.add_date}</td>
                        <td>
                            <ModalProblem
                                create={false}
                                problem={problem}
                                resetState={props.resetState}
                                newProblem={props.newProblem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveProblem
                                pk={problem.id}
                                resetState={props.resetState}
                            />
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    )
}

export default ListProblems