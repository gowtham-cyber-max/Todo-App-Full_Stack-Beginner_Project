import React, { useState, useRef,useEffect } from "react";
import Button from "@mui/material/Button";
import { collection,addDoc,updateDoc,doc,deleteDoc, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./Backend/firebase";
import  {auth}  from "./Backend/firebase";
import { where } from "firebase/firestore";
import {onAuthStateChanged } from "firebase/auth";
import "./todo.css";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
function Todo() {

  const collection_Ref = collection(db,"Tasks");
  const item = useRef(null);
  const [itemList, updateitem] = useState([]);
  onAuthStateChanged(auth, (user) => {
    if (user) {
          fetch();
    } else {
      console.log("logOut");
    }
  });

  const fetch = async () => {
    try {
      
      const q=query(collection_Ref,where('user_id','==',auth.currentUser.uid));
      onSnapshot(q,(querySnapshot)=>{

        const filterdata = querySnapshot.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        filterdata.sort((a,b)=>a.createdAt - b.createdAt);
        updateitem(filterdata);
      })

      
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    fetch();
  });
  
  
  const handleCreate=async(event)=>{
    try{
      event.preventDefault();
    if (item.current.value.length > 2){
      await addDoc(collection_Ref,{
        name : item.current.value,
        completed:false,
        user_id : auth.currentUser.uid,
        createdAt : serverTimestamp()
        
      })
      item.current.value="";
      fetch();
    }
  }
  catch(e){
      console.log(e);
    }
  }
  const handleclick = async(id,state) => {
    const doc_ref=doc(db,"Tasks",id);
    updateDoc(doc_ref,{
      completed:!state
    });
    fetch();
  };
  const HandleDel = async(id) => {
    const del_ref=doc(db,"Tasks",id);
    await deleteDoc(del_ref);
    fetch();
  };
  return (
    <div className="body-todo">

    
    <div className="todobox">
      <div className="input-field">
      <h1 className="head">Todo List</h1>
      <form onSubmit={handleCreate}>

        <input id="inp" ref={item} type="text"></input>
        <Button size="small" type="submit" variant="contained" color="success">
          Add
        </Button>
      </form>
      </div>

        <div className="table-box">

          {itemList.map((item, index) => {
            const styling = item.completed
              ? { "textDecoration": "line-through" }
              : {};
            return (
                <div style={styling} className="list" onClick={() => handleclick(item.id,item.completed)}>
                  <p>
                  {item.name}
                  </p>
                  <input type="checkbox" checked={item.completed } onChange={() => handleclick(item.id,item.completed)} onClick={() => handleclick(item.id,item.completed)}></input>
                  <IconButton aria-label="delete"
                   onClick={() => HandleDel(item.id)}
                  >
                      <DeleteIcon />
                  </IconButton>
                 
                </div>
            );
          })}

              </div>
              </div>
              </div>
  );
}

export default Todo;
