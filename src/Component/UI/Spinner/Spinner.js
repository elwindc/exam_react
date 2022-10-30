import React from 'react';
import loader from '../../../images/loader.gif';
import './Spinner.scss';

const Spinner = (props) => {

    const activeState = props.spinnerstate;
    //console.log(props.spinnerstate)

    return (
        <div className={activeState ? 'active spinner-wrap' : 'spinner-wrap'}>
            <img src={loader} alt="loader" />
        </div>
    )
}

export default React.memo(Spinner);