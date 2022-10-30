import React from 'react';
import SplitCamelCase from '../splitCamelCase';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Buttons/Buttons';
import { LoginContext } from '../../Context/LoginContext';



const OrderSummary = (props) => {

    const { user } = React.useContext(LoginContext);
    
    const summary = React.useMemo(() => Object.keys(props.addOnsList).map(item => {
        if (props.addOnsList[item] !== 0) {
            return (
                <li key={item}><SplitCamelCase text={item}></SplitCamelCase></li>
            )
        }
    }), [props])

    return (
        <React.Fragment>
            <Spinner spinnerstate={props.spinnerState}></Spinner>
            <React.Fragment>
                <p>Hi, {user.name}. Here's your Order</p>
                <h3><strong>{props.teaType}</strong></h3>
                <div className='summary-wrap'>
                    <ul>

                        {summary}
                    </ul>
                    <p className='pricing'>Total Price: {props.totalPrice.toFixed(2)}</p>
                </div>
                <div className='btn-wrapper'>
                    <Button type='cancel btn-text' clicked={props.hideBackdrop}>Cancel</Button>
                    <Button type='default' clicked={props.checkout}>Checkout</Button>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default React.memo(OrderSummary);
