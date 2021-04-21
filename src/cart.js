import React,{useState,useEffect} from 'react';
import CartIcon from './shopping-cart.svg'
import './App.css';
const Cart = props=>{
    const [total,setTotal] = useState(0)
    const [show,setShow] = useState(false)
    useEffect(()=>{
        let totalMoney = 0;
        for(let i=0;i<props.data.length;i++){
            totalMoney = totalMoney + props.data[i].price
        }
        setTotal(totalMoney)
    },[props.data])
    const showCart = ()=>{
        return (
            <div className="cart-data">
                {props.data.map((dataItem)=>{
                    return(
                        <div className="cart-item" key={dataItem.id}>
                                <img src={process.env.PUBLIC_URL+dataItem.src_1} alt={dataItem.title} />
                                <div className="content">
                                    <p>{dataItem.title}</p>
                                    <p style={{'color':'grey'}}>{dataItem.style}</p>
                                    <p style={{'color':'grey'}}>Qunatity:1</p>
                                </div>
                            <span className="cart-item-price">${dataItem.price}</span>
                            <span className="close" onClick={()=>props.removeFromCartRef(dataItem.id)}>x</span>
                        </div>
                    )
                })}
                <div style={{'backgroundColor':'grey','display':'flex','justifyContent':'space-between','padding':'5px'}}>
                    <p>Total:</p>
                    <p>${total}</p>
                </div>
                <center><button className="checkout-btn">Checkout</button></center>
            </div>
        )
    }
    return (
    <React.Fragment>
        <div className="header">
            <p>T-shirt Store</p>
            <span style={{'position':'relative'}}>
                <img src={CartIcon} alt="cart" height="30" width="30" onClick={()=>setShow(!show)}/>
                <span className="count">{props.data.length}</span>
            </span>
        </div>
        {show ? showCart(): null}
    </React.Fragment>
    )
}
export default Cart;