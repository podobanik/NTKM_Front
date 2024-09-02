import {Table} from "reactstrap";
import ModalProblem from "./ModalProblem";
import AppRemoveProblem from "./appRemoveProblem.js";


const ListProblems = (props) => {
    const {problems} = props
    const {users} = props
    const {problem_status_all} = props
    const {problem_type_all} = props
    //const {sectors} = props
    const {objects_of_work} = props
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
                <th>Дата изменения</th>
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
                        <td>{users[problem.user].first_name + " " + users[problem.user].last_name + " " + users[problem.user].second_name}</td>
                        <td>{problem_type_all[problem.problem_type].problem_type_text}</td>
                        <td>{problem_status_all[problem.problem_status].problem_status_text}</td>
                        <td>{objects_of_work[problem.object_of_work].object_of_work_text}</td>
                        <td>{problem.control_date}</td>
                        <td>{problem.add_date}</td>
                        <td>{problem.change_date}</td>
                        <td>
                            <ModalProblem
                                create={false}
                                problem={problem}
                                users={users}
                                problem_type_all={problem_type_all}
                                problem_status_all={problem_status_all}
                                objects_of_work={objects_of_work}
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