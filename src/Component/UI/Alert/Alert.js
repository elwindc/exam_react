import React from 'react';
import './Alert.scss';

const Alert = (props) => {

    let alertMessage = <p>This is an error occur please try again.</p>;
    let classNameVar = 'error';

    if (props.info === 'success') {
        alertMessage = <p>{ props.name}, Successfully deleted.</p>;
        classNameVar = 'success';
    }

    if (props.info === 'updated') {
        alertMessage = <p>{props.name}, Updated successfully.</p>;
        classNameVar = 'updated';
    }
    
    return (
        <div className={`alert-box ${classNameVar}`} style={{
            opacity: props.show ? '1' : '0',
            visibility: props.show ? 'visible' : 'hidden'
        }}>
            {alertMessage}
        </div>
    );
}

export default React.memo(Alert)
