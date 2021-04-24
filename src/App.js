import {useEffect,useState,useRef} from 'react';
import products from './products';
import Cart from './cart';
import ShowProducts from './showProducts';
import Filters from './filters'
import './App.css';

const App = ()=>{
  const cartRef = useRef(null);
  const [data,setData] = useState('')
  const [shirtsize,setSize] = useState('ALL')
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
    cartRef.current.addToCart(tempArray[index])
    tempArray.splice(index,1)
    setData(tempArray)
    applyFilter(shirtsize)
  }
  const removeFromCart = (obj)=>{
    setData([...data,obj])
    applyFilter(shirtsize)
  }

  return (
    <div className="container">
      <Cart ref={cartRef} removeFromCartRef = {removeFromCart}/>
      {data === '' ? <div><p style={{'textAlign':'center'}}>loading....</p></div> : 
      <div>
        <Filters changeButtonStatus={changeButtonStatus} />
        <ShowProducts data={filtereddata} handleAddToCart={handleAddToCart}/>
      </div>}
    </div>
  )
}
export default App;
