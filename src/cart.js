import React,{useState,forwardRef, useImperativeHandle} from 'react';
import CartIcon from './shopping-cart.svg'
import './App.css';
const Cart = forwardRef((props,ref)=>{
    const [total,setTotal] = useState(0)
    const [show,setShow] = useState(false)
    const [cartData,setCartData] = useState([])

    useImperativeHandle(ref, () => ({
        addToCart(obj){
            const tempArray = [...cartData,obj]
            setTotal(total + obj.price)
            setCartData(tempArray)
        }
      })); 
    const removeFromCart = (id)=>{
        const tempArray = [...cartData]
        let index=-1;
        for(let i=0;i<tempArray.length;i=i+1){
            if(tempArray[i].id === id){
                index = i
            }
        }
        props.removeFromCartRef(tempArray[index])
        setTotal(total - tempArray[index].price)
        tempArray.splice(index,1)
        setCartData(tempArray)
    }
    const showCart = ()=>{
        return (
                <React.Fragment>
                    <div className="backdrop" onClick={()=>setShow(false)}></div>
                    <div className="cart-data">
                        {cartData.map((dataItem)=>{
                            return(
                                <div className="cart-item" key={dataItem.id}>
                                        <img src={process.env.PUBLIC_URL+dataItem.src_1} alt={dataItem.title} />
                                        <div className="content">
                                            <p>{dataItem.title}</p>
                                            <p style={{'color':'grey'}}>{dataItem.style}</p>
                                            <p style={{'color':'grey'}}>Qunatity:1</p>
                                        </div>
                                    <span className="cart-item-price">${dataItem.price}</span>
                                    <span className="close" onClick={()=>removeFromCart(dataItem.id)}>x</span>
                                </div>
                            )
                        })}
                        {cartData.length === 0 ? <p>No Items in Cart</p>:<span><div style={{'backgroundColor':'grey','display':'flex','justifyContent':'space-between','padding':'5px'}}>
                            <p>Total:</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="checkout-btn" style={{'textAlign':'center','cursor':'pointer'}}>Checkout</p></span>}
                    </div>
                </React.Fragment>
        )
    }
    return (
    <React.Fragment>
        <div className="header">
            <p style={{'color':'black','fontSize':'1.2rem'}}>T-shirt Store</p>
            <span style={{'position':'relative'}}>
                <img src={CartIcon} alt="cart" height="30" width="30" onClick={()=>setShow(!show)}/>
                <span className="count">{cartData.length}</span>
            </span>
        </div>
        {show ? showCart(): null}
    </React.Fragment>
    )
})
export default Cart;
