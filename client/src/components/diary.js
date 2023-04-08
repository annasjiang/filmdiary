import Rating from '@mui/material/Rating';
import defaultposter from './search/defaultposter.jpeg';
import React, { useEffect, useState } from "react";

export default function Diary() {
  const [records, setRecords] = useState([]);

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
      setRecords(records);
    }
    getRecords();
    return; 
  }, [records.length]);


  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
  }

  // get reviews
  const Record = (props) => (
    <a href={`/review/${props.record._id}`} style={{ textDecoration: 'none', color: 'black'}}>
    <tr> 
      {/* use thumbnails */}
      <td class="col-md-2">
        {
          props.record.poster === "http://localhost:3000/static/media/defaultposter.71253f31.jpeg" ? 
          (<img src={defaultposter} class="img-fluid" alt="poster"/>) : 
          (<img src={`http://image.tmdb.org/t/p/w185${props.record.poster.substring(34, 250)}`} class="img-fluid" alt="poster"/>)
        }
      </td>
      <td>
        <b style={{display: "inline", marginRight: 5}}>{props.record.name}</b>
        <p className='text-muted' style={{fontSize: 14, display: "inline"}}>({props.record.year})</p> 
        <br></br>
        <p class="text-muted">watched on {props.record.date}</p>
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
