import React from "react";
import './card.css'
import axios from "axios";
const Card=({post,handleDelete})=>{
    // const handleDelete=(id)=>{
    //     if(window.confirm("are u sure want to delete")){
    //         axios.delete(`http://localhost:8081/delete/${id}`);

    //     }
    // }
    return (
        <>
        <div className="card_container">
           <h3>{post.note}</h3>
           <div className="dlt_icon" onClick={handleDelete}>
            <img src="https://icons.veryicon.com/png/o/business/simple-linear-icon-icon/delete-332.png" height="30px" alt="icon"/>
           </div>
        </div>
        </>
    )
}
export default Card;