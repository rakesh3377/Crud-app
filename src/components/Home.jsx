import React, { useEffect, useState } from "react";


function App(){
  const [count, setcount] = useState(0);
  const [msg, setmsg] = useState(0);

  useEffect(()=>{
    console.log("hello")
  },[count])

  return(
    <div>
      <button onClick={() => {setcount(count + 1)}}>increase</button>
      <h1>count is: {count}</h1>
      <button onClick={() => {setmsg(msg + 1)}}>send message</button>
      <h4>{msg}</h4>
    </div>
  )
}