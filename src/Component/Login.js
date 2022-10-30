import React from 'react';
import { LoginContext } from '../Context/LoginContext';
import { useSelector, useDispatch } from 'react-redux';
import { loginState } from '../Context/UsersReducer';

const USER_REGEX = /^(?!\s*$)[-a-zA-Z0-9_:,.\s]{1,100}$/;

function Login(props) {
    const { user, setUser } = React.useContext(LoginContext);
    const isLoggin = useSelector((state) => state.isLoggin.value)
    const dispatch = useDispatch();
    
    const [loginValid, setLoginValid] = React.useState(false);
    const [userFocus, setUserFocus] = React.useState(false);
    const [addressFocus, setAddressFocus] = React.useState(false);

    React.useEffect(() => {
        const result = USER_REGEX.test([user.name, user.address]) && user.name !== '' && user.address !== '';
        if (result) {
            setLoginValid(true)
        }
    }, [user])


    // function handleLogin(e) {
    //     e.preventDefault();
    //     dispatch(loginState({ test: true }))
    // }


    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setUser(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return (
        <React.Fragment>
            {isLoggin.test ? <label style={{ fontSize: '20px' }}>Welcome {user.name},</label>
                : (
                    <React.Fragment>
                        <div className={`input-wrap ${!loginValid && userFocus ? 'error' : ''}`}>
                            <label>State your Name.</label>
                            <input
                                type="text"
                                name="name"
                                required
                                onChange={handleChange}
                                value={user.name}
                                placeholder="Insert your name"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                        </div>
                        <div className={`input-wrap ${!loginValid && addressFocus ? 'error' : ''}`}>
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                onChange={handleChange}
                                value={user.address}
                                placeholder="Complete Address"
                                onFocus={() => setAddressFocus(true)}
                                onBlur={() => setAddressFocus(false)}
                            />

                        </div>
                        <div className='input-wrap'>
                            <label>&nbsp;</label>
                            {/* <button onClick={props.handleLogin} disabled={!loginValid} className='button--secondary'>{!props.isLogged ? 'Login' : 'Logout'}</button> */}
                            <button onClick={() => {
                                dispatch(loginState({test: true}))
                            }} disabled={!loginValid} className='button--secondary'>{!props.isLogged ? 'Login' : 'Logout'}</button>
                        </div>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}

export default React.memo(Login)