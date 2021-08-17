import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import getTemp from "hooks/getTemp";
import updateTemp from "hooks/updateTemp"
import Plot from "views/plot"
import TodoList from "./todolist";
// react-bootstrap components
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
import Timer from "./timer";
import moment from 'moment-timezone';


const Dashboard = () => {
  const initial = [
    {
      "duration": 0.0,
      "temp": 0,
      "id": 0
    }
  ]

  const [update, setupdate] = useState(false);
  const [store_temp, settemp] = useState(null);
  const [store_time, settime] = useState(null);
  const [store_type, setType] = useState(-1);

  const [MT, setMT] = useState(initial);
  const [HLT, setHLT] = useState(initial);
  const [BK, setBK] = useState(initial);
  const { begin_data } = getTemp(setMT, setHLT,setBK);
  const { updateSucess, type } = updateTemp(update, store_temp, store_time, store_type);

  const [MT_time, setMT_time] = useState("");
  const [HLT_time, setHLT_time] = useState("");
  const [MT_temp, setMT_temp] = useState("");
  const [HLT_temp, setHLT_temp] = useState("");
  const [BK_time, setBK_time] = useState("");
  const [BK_temp, setBK_temp] =  useState("");


  const insertToDB = (insertType) => {
    setType(insertType);
    if (insertType == 20) {
      settemp(MT_temp);
      settime(MT_time);
      setMT({
        "duration": MT_time,
        "temp": MT_temp,
        "timeStamp": moment.utc().format('YYYY-MM-DD hh:mm:ss A')
      }

      )
    }
    else if(insertType == 10){
      settemp(HLT_temp);
      settime(HLT_time);
      setHLT({
        "duration": HLT_time,
        "temp": HLT_temp,
        "timeStamp": moment.utc().format('YYYY-MM-DD hh:mm:ss A')
      })
    }
    else
    {
      settemp(BK_temp);
      settime(BK_time);
      setBK({
        "duration": BK_time,
        "temp": BK_temp,
        "timeStamp": moment.utc().format('YYYY-MM-DD hh:mm:ss A')
      })
    }

    setMT_time("");
    setHLT_time("");
    setMT_temp("");
    setHLT_temp("");
    setBK_time("");
    setBK_temp("");
    
    setupdate((Prev) => !Prev);
  }




  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category"><div style={{ fontWeight: 'bold', color: 'red' }}>MT</div> Temperature</p>
                      <Card.Title as="h4">
                        <span>{MT && MT.temp}</span>°F</Card.Title>
                      <p className="card-category">Duration</p>
                      <Card.Title as="h4">
                        <Timer duration={MT ? MT.duration : "000"} date={MT ? MT.timeStamp : "0000"}></Timer>
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <span>

                  <Form.Group>
                    <label>Update <div style={{ fontWeight: 'bold', color: 'red' }}>MT</div>  Temperature</label>
                    <Form.Control
                      onChange={(e) => { setMT_temp(e.target.value) }}
                      placeholder="in Fahrenheit"
                      type="text"
                      value={MT_temp}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    °F
                  </div>
                  <Form.Group>
                    <label>Update Duration for <div style={{ fontWeight: 'bold', color: 'red' }}>MT</div> in Minute</label>
                    <Form.Control onChange={(e) => { setMT_time(e.target.value) }}
                      placeholder="in Minute"
                      type="text"
                      value={MT_time}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    minutes
                  </div>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={() => { insertToDB(20) }}
                  >
                    Update
                  </Button>

                </span>


              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category"><div style={{ fontWeight: 'bold', color: 'red' }}>HLT</div>  Temperature</p>
                      <Card.Title as="h4">
                        <span>{HLT && HLT.temp}</span>°F</Card.Title>
                      <p className="card-category">Duration</p>
                      <Card.Title as="h4">
                        <Timer duration={HLT ? HLT.duration : "000"} date={HLT ? HLT.timeStamp : "0000"}></Timer></Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <span>

                  <Form.Group>
                    <label>Update <div style={{ fontWeight: 'bold', color: 'red' }}>HLT</div>  Temperature</label>
                    <Form.Control
                      placeholder="in Fahrenheit"
                      type="text"
                      value={HLT_temp}
                      onChange={(e) => { setHLT_temp(e.target.value) }}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    °F
                  </div>
                  <Form.Group>
                    <label>Update Duration for <div style={{ fontWeight: 'bold', color: 'red' }}>HLT</div> in Minute</label>
                    <Form.Control
                      placeholder="in Minute"
                      type="text"
                      value={HLT_time}
                      onChange={(e) => { setHLT_time(e.target.value) }}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    minutes
                  </div>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={() => { insertToDB(10) }}
                  >
                    Update
                  </Button>

                </span>


              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category"><div style={{ fontWeight: 'bold', color: 'red' }}>BK</div>  PowerOutput</p>
                      <Card.Title as="h4">
                        <span>{BK && BK.temp}</span>%</Card.Title>
                      <p className="card-category">Duration</p>
                      <Card.Title as="h4">
                        <Timer duration={BK ? BK.duration : "000"} date={BK ? BK.timeStamp : "0000"}></Timer></Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <span>

                  <Form.Group>
                    <label>Update <div style={{ fontWeight: 'bold', color: 'red' }}>BK</div>  PowerOutput</label>
                    <Form.Control
                      placeholder="in Fahrenheit"
                      type="text"
                      value={BK_temp}
                      onChange={(e) => { setBK_temp(e.target.value) }}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    %
                  </div>
                  <Form.Group>
                    <label>Update Duration for <div style={{ fontWeight: 'bold', color: 'red' }}>BK</div> in Minute</label>
                    <Form.Control
                      placeholder="in Minute"
                      type="text"
                      value={BK_time}
                      onChange={(e) => { setBK_time(e.target.value) }}
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    minutes
                  </div>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={() => { insertToDB(30) }}
                  >
                    Update
                  </Button>

                </span>


              </Card.Footer>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col md="8">


            <Plot ></Plot>


          </Col>

        </Row>
        <Row>

          <TodoList></TodoList>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
