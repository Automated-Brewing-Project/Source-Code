import React, { useEffect, useState } from 'react';


const updateTemp = (setMT, setHLT,setBK) => {


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [msg, setMsg] = useState(false)

  useEffect( async() => {
    await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=20")
      .then((value) => value.json())
      .then(result => { setMT(result[0]), console.log(result[0]) })
    await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=10")
      .then((value) => value.json())
      .then(result => { setHLT(result[0]), console.log(result[0]) })
    await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/setTemp?type=30")
      .then((value) => value.json())
      .then(result => { setBK(result[0]), console.log(result[0]) })
      .then(
        setMsg(true)
      )




    return () => { console.log("fetching data") }
  }, [])

  return { msg }

}


export default updateTemp;