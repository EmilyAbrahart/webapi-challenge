import React from 'react';


const Action = (props) => {
  return (
    <div>
      <h5>{props.description}</h5>
      <p>{props.notes}</p>
    </div>
  )
}

export default Action;