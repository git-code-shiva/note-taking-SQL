const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Global@259",
    database:"notetaking",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
const port = 8081;

app.get("/get",(req,res)=>{
    const sqlGet = "SELECT * FROM notes_db";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
})

app.post("/post",(req,res)=>{
    const {note} = req.body;
    if(!note){
        return res.status(400).json({error:"note can not be empty"})
    }
    const sqlInsert = "INSERT INTO notes_db (note) VALUES (?)";
    db.query(sqlInsert,[note],(error,result)=>{
        if(error){
            console.log(error)
            return res.status().json({error: "unable to add note"});
        }
        return res.status(200).json({message:"Note Added sucessfullt"})
    })
})

app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM notes_db WHERE id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error)
        }
    })
})
// app.get("/",(req,res)=>{
//     const sqlInsert = "INSERT INTO notes_db (note) VALUES ('first note here')";
//     db.query(sqlInsert,(err,result)=>{
//         console.log("error", err);
//         console.log("result", result);
//         res.send("Hello express")
//     })
// })

app.listen(port,()=>{
    console.log(`server is up at port ${port}`);
})