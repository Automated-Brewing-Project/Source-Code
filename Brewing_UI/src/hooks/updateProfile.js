
import React, { useState,useEffect } from "react";


const updateProfile = (update,profile) =>

{
    const [success, setsuccess ] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(async() =>
    {
       
        if(count != 0)
        {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            };
    
            await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/profile", requestOptions)
                .then(setsuccess(true))
                .catch(error => {
                    setsuccess(false)
                })

                console.log("update")

        }
         
            setCount(count + 1);

            
    },[update])


    return {success}

}

export default updateProfile;