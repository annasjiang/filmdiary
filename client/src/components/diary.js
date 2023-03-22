import Rating from '@mui/material/Rating';
import poster from './poster.jpg';
import React, { useEffect, useState } from "react";

export default function Diary() {
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:4000/record/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      // sort by date new -> old
      var sortedData= records.sort((function (a, b) { return new Date(b.date) - new Date(a.date) }));
      setRecords(sortedData);
    }
    getRecords();
    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(deleteId) {
    alert(deleteId);
    await fetch(`http://localhost:4000/${deleteId}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== deleteId);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // get reviews
  const Record = (props) => (
    <a href={`/review/${props.record._id}`} style={{ textDecoration: 'none', color: 'black'}}>
    <tr> 
      <td class="col-md-2"><img src={poster} class="img-fluid"/></td>
      <td>
        <b>{props.record.name}</b> <br></br>
        watched on {props.record.date} <br></br>
        <Rating
            name="simple-controlled"
            defaultValue={props.record.rating}
            value={props.record.rating}
            size="small"
            readOnly/> <br></br>
        <p>{props.record.review}</p>
      </td>
    </tr>
    </a>
  );

  // display reviews
  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3>My Diary</h3>
      <table className="table table-hover" style={{ marginTop: 20 }}>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
