import React from "react";
import BackDrop from "../Backdrop/Backdrop";

function Modal(props) {

    return(
        <BackDrop show = { props.show } clicked = { props.hideBackdrop } >
        <div
            style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}
            className="Modal">{props.children}</div>
        </BackDrop>
    )
} 


export default React.memo(Modal);