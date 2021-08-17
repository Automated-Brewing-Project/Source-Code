import React, { useState, useEffect } from "react";

import moment from 'moment-timezone';
import duration_moment from 'moment'

const timer = ({ duration, date }) => {

    const [time, setTime] = useState()
    const [countDown, setcountDown] = useState(
        {
            days: "0",
            hour: "0",
            min: "0",
            sec: "0"
        })

    const setClock = (future) => {
        const futureDate = moment(future);
        const today = moment();

        const clockDuration = moment.duration(futureDate.diff(today));


        const days = Math.floor(clockDuration.asDays());
        const hours = clockDuration.hours();
        const minutes = clockDuration.minutes();
        const seconds = clockDuration.seconds();


        if(seconds<0)
        {
            setcountDown({
                Finished: "Brewing is "
            })
        }
        else
        {
            setcountDown({
                days, hours, minutes, seconds
            })
        }
        

    }


    useEffect(() => {
        var x = moment.utc(date).add(duration, 'minutes').tz('America/Chicago').format("YYYY-MM-DD HH:mm:ss");

        setClock(x);

        const interval = setInterval(() => {
           
            setClock(x);
            
        }, 1000);
        return () => clearInterval(interval);


    }, [date])





    return (<>

        {Object.keys(countDown).map((key, i) => <div>{countDown[key]} {key}</div>)}
    </>)
}

export default timer