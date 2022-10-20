import React from "react";

const Button = (props) => {

    return (<button onClick={props.clicked} className={ 'button--secondary ' + props.type}>{props.children}</button>)
}

export default Button