import React from "react";
import './Backdrop.scss';


const BackDrop = (props) => {

    return (
        <div style={{
            opacity: props.show ? '1' : '0',
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
        }} className="backdrop" onClick={(e) => props.clicked(e.stopPropagation())}>
            {props.children}
        </div>
    )
}

export default React.memo(BackDrop);