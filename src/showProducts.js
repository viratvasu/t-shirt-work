import React from 'react'
const ShowProducts = ({data,handleAddToCart})=>{
    const renderData = ()=>{
        return data.map((dataItem)=>{
          return(
            <div key={dataItem.id} className="box">
              {dataItem.isFreeShipping ? <span className="shipping-tag">Free Shipping</span> : null}
              <div className="image-container">
                <img src={process.env.PUBLIC_URL+dataItem.src_1} alt={dataItem.title} />
              </div>
              <div className="box-body">
                <p className="title">{dataItem.title}</p>
                <div className="divider"></div>
                <p>{dataItem.currencyFormat} {dataItem.price}</p>
                <p style={{'color':'grey'}}>or {dataItem.installments} x {dataItem.currencyFormat} {(dataItem.price/dataItem.installments).toFixed(2)}</p>
                {/* <p>{dataItem.availableSizes.map(size=>size+",")}</p> */}
                <button onClick={()=>handleAddToCart(dataItem.id)}>Add To cart</button>
              </div>
            </div>
          )
        })
      }
    return(
        <div className="products">
            <p style={{'marginTop':'20px','textAlign':'center'}}>{data.length} product(s) found</p>
            <div className="box-container">{renderData()}</div>
        </div>
    )
}
export default ShowProducts;
