import React, { Fragment } from 'react';
import MilkteaAsset from '../images/milk-tea.png';
import SplitCamelCase from '../Component/splitCamelCase';
import Modal from '../Component/UI/Modal/Modal';
import OrderSummary from '../Component/MilkBuilder/OrderSummary';
import serverInstance from '../Api/AxiosOrder';
import { LoginContext } from '../Context/LoginContext';
import { useSelector } from 'react-redux';
import HeaderWrap from '../Component/Layout/HeaderWrap';
import Login from '../Component/Login';

const INGREDIENTS_PRICE = {
    pearls: 10,
    creamChesse: 20,
    cocoJelly: 10,
    coffeJelly: 10,
    ice: 10,
    extraMilk: 20,
    syrup: 20,
}
const REGISTER_URL = '/milkTeaOrder.json';

export default function MilkBuilder(props) {
    const { user } = React.useContext(LoginContext);
    const isLoggin = useSelector((state) => state.isLoggin.value)
    const [tea, setTea] = React.useState("Bubble Tea");
    const [ addOns, setAddOns] = React.useState(
        {
            pearls: 0,
            creamChesse: 0,
            cocoJelly: 0,
            coffeJelly: 0,
            ice: 0,
            extraMilk: 0,
            syrup: 0,
        }
        
    );
    const [price, setPrice] = React.useState(60);
    // const [btnDisable, setBtnDisable] = React.useState(false);
    const [modalState, setModalState] = React.useState(false);
    const [spinnerState, setSpinnerState] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [orderSuccess, setOrderSuccess] = React.useState(null);

    const options = [
        "Bubble Tea", "Black Tea", "Green Tea", "Almond Tea", "House Tea"
    ]


    function onCheck(event, addOn) {
        const updatedCount = event.target.checked ? 1 : 0;
        const updatedIngredients = { ...addOns }
        updatedIngredients[addOn] = updatedCount;
        const addOnsPrice = INGREDIENTS_PRICE[addOn];

        setAddOns(updatedIngredients);
        if (event.target.checked) {
            setPrice(prevPrice => prevPrice + addOnsPrice)
        } else {
            setPrice(prevPrice => prevPrice - addOnsPrice)
        }
    }

    function teaType(e) {
        setTea(e.target.value);
    }

    function BackDropHandler() {
        setModalState(!modalState);
    }

    function handleCheckout(e) {
        e.preventDefault();

        setSpinnerState(true);

        const order = {
            tea: tea,
            addOns: addOns,
            price: price,
            name: user.name,
            address: user.address,
            orderStatus: 'Preparing..'
        }
        
        serverInstance.post(REGISTER_URL, order)
            .then(response => {
                setOrderSuccess([response.status]);
                setModalState(false);
                setSpinnerState(false);
            })
            .catch(error => {

                setErrMsg(error.message);
                if (!error?.response) {
                    setErrMsg('No Server Response');
                }  else {
                    setErrMsg('Order Failed')
                }
                console.log(errMsg);
                
            });
    }

    function openModal() {
        setModalState(true);
    }

    function newOrder() {
        setOrderSuccess(false)
        setAddOns({
            pearls: 0,
            creamChesse: 0,
            cocoJelly: 0,
            coffeJelly: 0,
            ice: 0,
            extraMilk: 0,
            syrup: 0,
        })
    }

    const controlsItem = Object.keys(addOns).map(addOn => {
        let qtyVal = addOns[addOn];
        return (
            
            <li key={addOn}>
                
                <div className='custom-checkbox'>
                    <input id={addOn} type="checkbox" onChange={(event)=>onCheck(event, addOn)} value={qtyVal} ></input>
                    <label htmlFor={addOn}>{<SplitCamelCase text={addOn}></SplitCamelCase>}</label>
                </div>
            </li>
        )
        
    })

    const optionElement = options.map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

    return (
        <Fragment>
            <HeaderWrap>
                <Login></Login>
            </HeaderWrap>
            <main>
                <div className='container'>
                    {orderSuccess ? (
                        <React.Fragment>
                            <div className='text--center'>
                                <h1 style={{ color: 'green', marginBottom: '30px' }}>Order Sucess</h1>
                                <button className='button--primary' onClick={newOrder}>Add new Order</button>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className='milkTea-preview'>
                                    <img src={MilkteaAsset} alt=""/>
                                </div>
                            </div>
                            <div className='col-md-7'>
                                <h5>Select Tea</h5>
                                <div className="custom-select">
                                    <label htmlFor='teatype'></label>
                                    <select onChange={teaType} name="teatype" id="teatype" value={tea}>
                                        {optionElement}
                                    </select>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur</p>
                                <p className='pricing'>Php {price.toFixed(2)}</p>
                                <div className='milk-addOns'>
                                    <label>Check Addons</label>
                                    <ul>
                                        {controlsItem}
                                    </ul>
                                    <button className="button--primary info m-t-40 btn-large" onClick={openModal}>Order Now</button>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>

                <Modal show={modalState} hideBackdrop={BackDropHandler} >
                {!isLoggin.test ?
                    <div className='text--center'><h4>Please you need to Login first.</h4></div>
                    :
                    <OrderSummary
                        teaType={tea}
                        addOnsList={addOns}
                        totalPrice={price}
                        checkout={handleCheckout}
                        hideBackdrop={BackDropHandler}
                        spinnerState={spinnerState}
                    ></OrderSummary>
                }
                </Modal>
            </main>
        </Fragment>
    );
}
