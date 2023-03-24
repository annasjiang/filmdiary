import poster from './poster.jpg';
import React, { useEffect, useState } from "react";

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [show, setShow] = useState(false);

  // This method fetches the lists from the database.
  useEffect(() => {
    async function getLists() {
      const response = await fetch(`http://localhost:4000/list/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const lists = await response.json();
      setLists(lists);
    }
    getLists();
    return; 
  }, [lists.length]);

  // This method will delete a list
  async function deleteList(deleteId) {
    await fetch(`http://localhost:4000/${deleteId}`, {
      method: "DELETE"
    });

    const newLists = lists.filter((el) => el._id !== deleteId);
    setLists(newLists);
  }

  // This method will map out the lists on the table
  function listList() {
    return lists.map((list) => {
      return (
        <List
          list={list}
          deleteList={() => deleteList(list._id)}
          key={list._id}
        />
      );
    });
  }

  // get reviews
  const List = (props) => (
    <a href={`/list/${props.list._id}`} style={{ textDecoration: 'none', color: 'black'}}>
    <tr> 
      <td class="col-md-2"><img src={poster} class="img-fluid"/></td>
      <td>
        <b>{props.list.name}</b> <br></br>
        <p class="text-muted">{props.list.description}</p>
      </td>
    </tr>
    </a>
  );

  // display reviews
  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3>My Lists</h3>
      <table className="table table-hover" style={{ marginTop: 20 }}>
        <tbody>{listList()}</tbody>
      </table>
    </div>
  );
}
