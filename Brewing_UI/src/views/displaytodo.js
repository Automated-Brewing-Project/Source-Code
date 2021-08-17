import React, { useState, useEffect } from "react";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { updateNamedImports } from "typescript";

const displayTodo = ({ key, obj, gettodo, setgettodo }) => {

    const [edit, setEdit] = useState(false);
    const [temp, setTemp] = useState(obj.todolist);
    const [diaplyList, setdiaplyList] = useState(obj.todolist);


    const remove = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": obj.id
            })
        };

        var newList = gettodo.filter(item => item.id !== obj.id)

        await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/todolist?type=remove", requestOptions)
            .then(setgettodo(newList),
                console.log(newList))
            .catch(error => {
                console.log(error)
            });




    }

    const editFuc = () => {
        setEdit(true);
    }

    const updateEdit = async () => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": obj.id,
                "todolist": temp
            })
        };


        await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/todolist?type=edit", requestOptions)
            .then(
                setdiaplyList(temp),
                setEdit(false)
            )
            .catch(error => {
                console.log(error)
            });



    }
    return (
        <>
            <tr>
                <td>
                    {diaplyList}
                </td>
                <td className="td-actions text-right">
                    <OverlayTrigger
                        overlay={
                            <Tooltip id="tooltip-488980961">
                                Edit Task..
                            </Tooltip>
                        }
                    >
                        <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                            onClick={() => editFuc()}
                        >
                            <i className="fas fa-edit"></i>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                        }
                    >
                        <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                            onClick={() => remove()}
                        >
                            <i className="fas fa-times"></i>
                        </Button>
                    </OverlayTrigger>
                </td>

            </tr>

            {edit &&
                <Card.Footer>
                    <Form.Group>
                        <Form.Control
                            onChange={(e) => setTemp(e.target.value)}
                            placeholder="in Fahrenheit"
                            type="text"
                            value={temp}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={() => updateEdit()}
                    >
                        Update


                    </Button>

                </Card.Footer>

            }
        </>


    )
}

export default displayTodo