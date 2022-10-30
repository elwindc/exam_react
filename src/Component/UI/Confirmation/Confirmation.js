import React from 'react';
import Button from '../Buttons/Buttons';

const Confirmation = (props) => {
    return (
        <div>
            <h4>Are you sure you want to delete {props.name}?</h4>
            <div className='btn-wrapper'>
                <Button type='cancel btn-text' clicked={props.hideBackdrop}>Cancel</Button>
                <Button type='button--primary action' clicked={props.onDelete}>Yes</Button>
            </div>
        </div>
    );
}

export default Confirmation;
