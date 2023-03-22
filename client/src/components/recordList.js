import Rating from '@mui/material/Rating';
import poster from './poster.jpg';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";;

export default function RecordList() {

  const [selectedId, setSelectedId] = React.useState();
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function custom_sort(a, b) {
    return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
  }

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
      <p>{props.record.position}</p>
    {/* <td>{props.record.rating}</td> */}

{/* OG ADD/DELETE */}
      {/* <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | */}
      {/* <button className="btn btn-link"
        onClick={() => {
          // setShowModal(true);
          props.deleteRecord(props.record._id);
        }}>Delete</button> */}

      {/* <Link className="btn btn-primary" to={`/review/${props.record._id}`}>View</Link> */}
{/* 
      <Link className="btn btn-primary ml-3" to={`/edit/${props.record._id}`}>Edit</Link>

      <button type="button" class="btn btn-primary ml-3" data-toggle="modal" data-target="#exampleModal" onClick={() => {
                  // idRef = props.record._id;
                  setSelectedId(props.record._id);
              }}>
        Delete
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center" style={{fontSize: 20}}>
            Are you sure you want to delete your review?
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" onClick={() => {
                  fetch(`http://localhost:4000/${selectedId}`, {
                    method: "DELETE"
                  });

                  const newRecords = records.filter((el) => el._id !== selectedId);
                  setRecords(newRecords);
              }} data-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div> */}

    </td>
  </tr>
  </a>
  
);

  // This following section will display the table with the records of individuals.
  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3>My Diary</h3>
      <table className="table table-hover" style={{ marginTop: 20 }}>
        {/* <thead>
          <tr>
            <th class="col-md-1">Date</th>
            <th class="col-md-2">Title</th>
            <th class="col-md-2">Review</th>
            <th class="col-md-1">Rating</th>
            <th class="col-md-1">Action</th>
          </tr>
        </thead> */}
        <tbody>{recordList()}</tbody>
      </table>
    </div>

    
  );
}
