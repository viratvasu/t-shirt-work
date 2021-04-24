import React,{useState} from "react";
const Filter = ({changeButtonStatus})=>{
    const [data] = useState(['XS','S','M','ML','L','XL','XXL'])
    return(
        <div className="filter-container">
            <p style={{'textAlign':'center','fontSize':'1.2rem'}}>Sizes:</p>
            <div className="filters">
                {data.map(dataItem=><button className="btn" onClick={e=>changeButtonStatus(e,dataItem)}>{dataItem}</button>)}
                <button className="btn active" onClick={e=>changeButtonStatus(e,"ALL")}>ALL</button>
            </div>
        </div>
    )
}
export default Filter;
