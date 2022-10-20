import React from 'react';

const HeaderWrap = (props) => {
    

    return (
        <header>
            <div className='container'>
                <div className='header-main'>
                    {props.children}
                </div>
            </div>
        </header>
    );
}

export default HeaderWrap;
