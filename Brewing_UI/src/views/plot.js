import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import getHistoryTemp from "hooks/getHistoryTemp"
import {
  Card
} from "react-bootstrap";

const plot = () => {


  const [MTHistory, setMTHistory] = useState([]);
  const [HLTHistory, setHLTHistory] = useState([]);
  const { retriveSuccess } = getHistoryTemp(setMTHistory, setHLTHistory);
  const [today_date, settoday_date] = useState(null);

  const [time, setTime] = useState([]);
  const [temp, setTemp] = useState([]);


  const [time2, setTime2] = useState([]);
  const [temp2, setTemp2] = useState([]);
  useEffect(() => {
    setTime([])
    setTemp([])
    setTime2([])
    setTemp2([])
    if (MTHistory != null) {


      MTHistory.map(data => {
        settoday_date(data.date.substring(0, 10))
        setTime(old => [...old, data.date.substring(11)])
        setTemp(old => [...old, data.temp])
      })



    }

    if (HLTHistory != null) {


      HLTHistory.map(data => {
        setTime2(old => [...old, data.date.substring(11)])
        setTemp2(old => [...old, data.temp])
      })



    }

    return () => { console.log(MTHistory) }

  }, [MTHistory, HLTHistory]);

  let data = {
    labels: time,
    series: [
      temp
    ],
  }

  let operation = {
    low: 0,
    high: Math.max(...temp),
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50,
    },
  }

  let data2 = {
    labels: time2,
    series: [
      temp2
    ],
  }

  let operation2 = {
    low: 0,
    high: Math.max(...temp2),
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      right: 50,
    },
  }


  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h4"><span style={{ fontWeight: 'bold', color: 'red' }}>MT</span> Temperature</Card.Title>

        </Card.Header>
        <Card.Body>
          <div className="ct-chart" id="chartHours">
            <p className="card-category">{today_date}</p>
            <ChartistGraph
              data={data}
              type="Line"
              options={operation}
              responsiveOptions={[
                [
                  "screen and (max-width: 640px)",
                  {
                    axisX: {
                      labelInterpolationFnc: function (value) {
                        return value[0];
                      },
                    },
                  },
                ],
              ]}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="legend">
            <i className="fas fa-circle text-info"></i>
            MT
          </div>
          <hr></hr>
          <div className="stats">
          </div>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title as="h4"><span style={{ fontWeight: 'bold', color: 'red' }}>HLT</span> Temperature</Card.Title>

        </Card.Header>
        <Card.Body>
          <div className="ct-chart" id="chartHours">
            <p className="card-category">{today_date}</p>
            <ChartistGraph
              data={data2}
              type="Line"
              options={operation2}
              responsiveOptions={[
                [
                  "screen and (max-width: 640px)",
                  {
                    axisX: {
                      labelInterpolationFnc: function (value) {
                        return value[0];
                      },
                    },
                  },
                ],
              ]}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="legend">
            <i className="fas fa-circle text-info"></i>
            HLT
          </div>
          <hr></hr>
          <div className="stats">
          </div>
        </Card.Footer>
      </Card>
    </div>


  )



}
export default plot;