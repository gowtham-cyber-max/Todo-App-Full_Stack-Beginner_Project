import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Axios1() {
    const[fact,setFact]=useState({});
    useEffect(()=>{
        axios.get("https://catfact.ninja/fact").then((response)=>{
            console.log(response.data);
            setFact(response.data);
        })
    },[]);
  return (
    <div>
        <h2>{fact.fact}</h2>;
    </div>
  )
}

export default Axios1