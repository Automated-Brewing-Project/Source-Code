
import React, { useState,useEffect } from "react";


const getProfile = () =>
{

    const [profile, setProfile] = useState()

    useEffect(async() =>
{
  await fetch("http://uta-senior-project-2.us-e2.cloudhub.io/profile")
.then((value) => value.json())
.then(result => {
  setProfile(result[0])
})


},[])


   
    return [profile, setProfile]
}


export default getProfile