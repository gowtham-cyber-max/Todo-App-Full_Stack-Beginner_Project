import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";

function Todo() {
  const item = useRef(null);
  const [itemList, updateitem] = useState([]);
  const handle = (event) => {
    event.preventDefault();
    if (item.current.value.length > 2) {
      updateitem([
        ...itemList,
        {
          id: itemList.length + 1,
          name: item.current.value,
          completed: false,
        },
      ]);
    }
    item.current.value = "";
  };
  const handleclick = (id) => {
    const updatedTasks = itemList.map((task) => {
      if (id === task.id) return { ...task, completed: !task.completed };
      else return task;
    });
    updateitem(updatedTasks);
  };
  const HandleDel = (idval) => {
    updateitem((oldValues) => {
      return oldValues.filter((itemList) => itemList.id !== idval);
    });
  };
  return (
    <div>
      <form onSubmit={handle}>
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
              ? { "text-decoration": "line-through" }
              : {};
            return (
              <tr>
                {" "}
                <td>{index + 1}</td>
                <td style={styling} onClick={() => handleclick(item.id)}>
                  {" "}
                  {item.name}{" "}
                </td>
                <td>
                  {" "}
                  <input type="checkbox" checked={item.completed } onClick={() => handleclick(item.id)}></input>{" "}
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
            );
          })}
        </table>
      </form>
    </div>
  );
}

export default Todo;
