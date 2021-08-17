import React, { useEffect, useState } from 'react';

const getHistoryTemp = (setMTHistory,setHLTHistory) =>
{
    const [msg,setmsg] = useState(false);

    useEffect(() =>
    {
    
        const interval = setInterval(async() => {
            await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/gettemp?type=20")
            .then((value) => value.json())
            .then(result => {setMTHistory(result)
            })
            
            await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/gettemp?type=10")
            .then((value) => value.json())
            .then(result => {setHLTHistory(result)
                })

            }, 10000);
        return () => clearInterval(interval);

    },[])
    

    return {msg}
}

export default getHistoryTemp;