import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from "../../card";
import './landingPage.css'
const LandingPage=()=>{
    const [post,setPost] = useState([]);
    const [data,setData] = useState("");

    const handlePost=async(e)=>{
        e.preventDefault();
        // const formdata = new FormData();
        // formdata.append("note",data)
        const note = data.note;
        const response = await axios.post("http://localhost:8081/post",{note})
        if(response.status ===200){
            loadData();
            setData({note:""});
        }
    }

    const handleInput=(e)=>{
        const {name, value} = e.target;
        setData({...data,[name]:value})
    }

    const loadData = async()=>{
        const response = await axios.get("http://localhost:8081/get")
        console.log(response)
        setPost(response.data);
    }
    useEffect(()=>{
       loadData();
    },[post])

    const handleDelete=async(id)=>{
        if(window.confirm("are u sure want to delete")){
           await axios.delete(`http://localhost:8081/delete/${id}`);
           loadData();
        }
    }
    return(
        <>
        <div className="input_bar">
            <input type="text" placeholder="Take a note..." name="note" value={data.note} onChange={handleInput}/>
            <button className="post_btn" onClick={handlePost}>Add</button>
        </div>

        <div className="result">
            {post.map((post,i)=>{
                return <Card post={post} key={i} handleDelete={()=>handleDelete(post.id)}/>
            })}
        </div>
        </>
    )
}
export default LandingPage;