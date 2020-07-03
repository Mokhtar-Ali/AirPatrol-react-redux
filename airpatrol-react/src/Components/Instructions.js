import React from "react";
import '../Css/instructions.css'



function Instructions() {
  return (
    <div className='instructions'>
      <h2 >Welcome to the Air Patrol Game!</h2>
      <hr />
      <h3 >Instructions</h3>
      <ul>
        <li>You are the environmental manager and your highest duty is to keep the air quality under control so your citizens can breath clearn air.</li>
        <li>You must monitor the oxygen and carbon dioxide output once a tree has been planted or removed.</li>
        <li>The weather and external factors will influence your decisions whether you need to plant or cut down a tree.</li>
        <li>You must also oversee the maintenece of the trees by watering them. Be prepared for some tree casualties. You will have tools availble to you to get the job done.</li>
        <li>The oxygen level must be equal or above the carbon dioxoide levels or else YOU LOSE!</li>
      </ul>
      <br />
      <div>
        <footer>&copy; Copyright 2020 Jay & Mocha</footer>
      </div>
    </div>

  )

}



export default Instructions;
