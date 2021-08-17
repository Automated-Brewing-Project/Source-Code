import React, { useState, useEffect } from "react";
import getTodolis from "hooks/getTodoList";
import DisplayTodo from "./displaytodo";
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

const todoList = () => {
  const [gettodo, setgettodo] = useState();
  const [add, setAdd] = useState(false);
  const [temp, settemp] = useState("");
  const [reload, setReload] = useState(true);
  const [error, setErrorMessage] = useState("");


  useEffect(async () => {

    await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/todolist")
      .then((value) => value.json())
      .then(result => {
        setgettodo(result)
      })
    console.log(gettodo)
  }, [reload])

  const addNew = async () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "todolist": temp })
    };


    await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/todolist", requestOptions)
      .then(
        setAdd(false),
        settemp(""),
        setErrorMessage("")
      )
      .catch(error => {
        setErrorMessage(error),
          console.log(error)
      });

    setReload(!reload)

  }


  return (<Col md="6">
    <Card className="card-tasks">
      <Card.Header>
        <Card.Title as="h4">Tasks</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="table-full-width">
          <Table>
            <tbody>
              {gettodo && gettodo.map((obj) =>

                <DisplayTodo key={obj.id} obj={obj} gettodo={gettodo} setgettodo={setgettodo}></DisplayTodo>

              )}

            </tbody>
          </Table>
        </div>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-488980961">
              Add Task..
            </Tooltip>
          }
        >
          <Button
            className="btn-simple btn-link p-1"
            type="button"
            variant="danger"
            onClick={() => setAdd(true)}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </OverlayTrigger>
        {add && <>
          <Form.Group>
            <Form.Control
              onChange={(e) => settemp(e.target.value)}
              placeholder="in Fahrenheit"
              type="text"
              value={temp}
            ></Form.Control>
          </Form.Group>

          <Button
            className="btn-fill pull-right"
            type="submit"
            variant="info"

            onClick={() => addNew()}
          >
            Update


          </Button>
          <hr></hr>
          {error && <div style={{ color: "red" }}>
            {error}
          </div>}

        </>
        }



      </Card.Footer>
    </Card>
  </Col>)
}

export default todoList