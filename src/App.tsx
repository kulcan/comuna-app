import React, { useState } from 'react';

function App() {

  const [msj, setMsj] = useState("")


  return (
    <div>
      <h1>Comuna App 4</h1>
      User <input type='text' /> <br />
      Pass <input type='text' /> <br />
      <button onClick={() => setMsj("Hello")}>Log in</button> <br />
      <label>{msj}</label>
    </div>
  );
}

export default App;
