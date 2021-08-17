import React, { useEffect, useState } from 'react';


const updateTemp = (update,temp,time,type) =>
{
    const [msg,setMsg] = useState(false);
    useEffect(() =>
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "temp": temp,
                "type": type,
                "duration": time
              })
        };
        
        if(type!=-1)
        {
            fetch('http://uta-senior-project-2.us-e2.cloudhub.io/setTemp', requestOptions)
            .then(response => response.json())
            .then(data => 
                {   console.log(data)
        
                    setMsg(true);
                    
                });

        }

        
        
    },[update,type])

        return {msg,type}

}


export default updateTemp;