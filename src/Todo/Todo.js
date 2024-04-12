import React, { useState, useRef,useEffect } from "react";
import Button from "@mui/material/Button";
import { collection,addDoc, getDocs, getDoc,updateDoc,doc,deleteDoc } from "firebase/firestore";
import { db } from "./Backend/firebase";
import { auth } from "./Backend/firebase";


function Todo() {

  const collection_Ref = collection(db,"Tasks");
  const item = useRef(null);
  const [itemList, updateitem] = useState([]);
 


  const fetch = async () => {
    try {
      const data = await getDocs(collection_Ref);
      const filterdata = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      updateitem(filterdata);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch(); // Call the fetch function to execute it
  }, []);


  const handleCreate=async(event)=>{
    try{
      event.preventDefault();
    if (item.current.value.length > 2){
      await addDoc(collection_Ref,{
        name : item.current.value,
        completed:false,
        user_id : auth.currentUser.uid

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
    const data = getDoc(doc_ref)
    console.log(data)
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
    <div>
      <form onSubmit={handleCreate}>
        <input id="inp" ref={item} type="text"></input>
        <Button size="small" type="submit" variant="contained" color="success">
          Add
        </Button>

        <table
          style={{
            width: "50%",
            border: "1px solid #ddd",
            border: "1",
            margin: "20px",
            textAlign: "center",
            padding: "8px",
          }}
        >
          {itemList.map((item, index) => {
            const styling = item.completed
              ? { "textDecoration": "line-through" }
              : {};
            return (
              <tbody>
              <tr key={index}>
              
                <td>{index + 1}</td>
                <td style={styling} onClick={() => handleclick(item.id,item.completed)}>
                  {item.name}
                </td>
                <td>
                  {" "}
                  <input type="checkbox" checked={item.completed } onChange={() => handleclick(item.id,item.completed)} onClick={() => handleclick(item.id,item.completed)}></input>{" "}
                </td>
                <td>
                  <Button
                    size="medium"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={() => HandleDel(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              </tbody>
            );
          })}

        </table>
      </form>
    </div>
  );
}

export default Todo;
