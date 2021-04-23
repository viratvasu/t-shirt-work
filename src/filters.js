import React from "react";
const Filter = ({changeButtonStatus})=>{
    return(
        <div className="filter-container">
            <p style={{'textAlign':'center','fontSize':'1.2rem'}}>Sizes:</p>
            <div className="filters">
            <button className="btn" onClick={e=>changeButtonStatus(e,"XS")}>XS</button>
            <button className="btn" onClick={e=>changeButtonStatus(e,"S")}>S&nbsp;</button>
            <button className="btn" onClick={e=>changeButtonStatus(e,"M")}>M</button>
            <button className="btn" onClick={e=>changeButtonStatus(e,"ML")}>ML</button>
            <button className="btn" onClick={e=>changeButtonStatus(e,"L")}>L&nbsp;</button>
            <button className="btn" onClick={e=>changeButtonStatus(e,"XL")}>XL</button>
            <button className="btn" onClick={e=>changeButtonStatus(e,"XXL")}>XXL</button>
            <button className="btn active" onClick={e=>changeButtonStatus(e,"ALL")}>ALL</button>
            </div>
        </div>
    )
}
export default Filter;