import {useEffect,useState} from 'react';
import products from './products';
import Cart from './cart';
import './App.css';

const App = ()=>{

  const [data,setData] = useState('')
  const [shirtsize,setSize] = useState('ALL')
  const [cartData,setCartData] = useState([])
  const [filtereddata,setFilteredData] = useState([])

  useEffect(()=>{
    setData(products)
    setFilteredData(products)
  },[])

  const applyFilter = (size)=>{
    if(size === "ALL"){
      setData(state=>{
        setFilteredData(state)
        return state
      })
    }
    else{
      setData(state=>{
        const filteredArray = state.filter(dataItem=>dataItem.availableSizes.indexOf(size) !== -1)
        setFilteredData(filteredArray)
        return state;
      })
    }
    setSize(size)
  }

  const changeButtonStatus = (e,size)=>{
    const allBtns = document.getElementsByClassName('btn')
    for (let i = 0; i < allBtns.length; i++) {
      allBtns[i].classList.remove('active');
    }
    e.currentTarget.classList.add('active')
    applyFilter(size)
  }

  const handleAddToCart = (id)=>{
    const tempArray = [...data]
    let index=-1;
    for(let i=0;i<tempArray.length;i=i+1){
      if(tempArray[i].id === id){
        index = i
      }
    }
    setCartData([...cartData,tempArray[index]])
    tempArray.splice(index,1)
    setData(tempArray)
    applyFilter(shirtsize)
  }
  const removeFromCart = (id)=>{
    const tempArray = [...cartData]
    let index=-1;
    for(let i=0;i<tempArray.length;i=i+1){
      if(tempArray[i].id === id){
        index = i
      }
    }
    setData([...data,tempArray[index]])
    tempArray.splice(index,1)
    setCartData(tempArray)
    applyFilter(shirtsize)
  }

  const renderData = ()=>{
    return filtereddata.map((dataItem)=>{
      return(
        <div key={dataItem.id} className="box">
          {dataItem.isFreeShipping ? <span className="shipping-tag">Free Shipping</span> : null}
          <div className="image-container">
            <img src={process.env.PUBLIC_URL+dataItem.src_1} alt={dataItem.title} />
          </div>
          <p className="title">{dataItem.title}</p>
          <div className="divider"></div>
          <p>{dataItem.currencyFormat} {dataItem.price}</p>
          <p style={{'color':'grey'}}>or {dataItem.installments} x {dataItem.currencyFormat} {(dataItem.price/dataItem.installments).toFixed(2)}</p>
          {/* <p>{dataItem.availableSizes.map(size=>size+",")}</p> */}
          <button onClick={()=>handleAddToCart(dataItem.id)}>Add To cart</button>
        </div>
      )
    })
  }

  return (
    <div className="container">
      <Cart data = {cartData} removeFromCartRef = {removeFromCart}/>
      {data === '' ? <center><div>loading....</div></center> : 
      <div>
        <center><p>Sizes:</p></center>
        <div className="filters">
          <button className="btn" onClick={e=>changeButtonStatus(e,"XS")}>XS</button>
          <button className="btn" onClick={e=>changeButtonStatus(e,"S")}>S</button>
          <button className="btn" onClick={e=>changeButtonStatus(e,"M")}>M</button>
          <button className="btn" onClick={e=>changeButtonStatus(e,"ML")}>ML</button>
          <button className="btn" onClick={e=>changeButtonStatus(e,"L")}>L</button>
          <button className="btn" onClick={e=>changeButtonStatus(e,"XL")}>XL</button>
          <button className="btn" onClick={e=>changeButtonStatus(e,"XXL")}>XXL</button>
          <button className="btn active" onClick={e=>changeButtonStatus(e,"ALL")}>ALL</button>
        </div>
        <center><p style={{'marginTop':'20px'}}>{filtereddata.length} product(s) found</p></center>
        <div className="box-container">{renderData()}</div>
      </div>}
    </div>
  )
}
export default App;
