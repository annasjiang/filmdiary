import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fontSize } from "@mui/system";

// import { createPopper } from '@popperjs/core';
// const popcorn = document.querySelector('#popcorn');
// const tooltip = document.querySelector('#tooltip');
// createPopper(popcorn, tooltip, {
//   placement: 'top',
// });

// import Dropdown from 'react-bootstrap/Dropdown';

// const idRef = React.useRef();

// const [selectedId, setSelectedId] = React.useState();

export default function RecordList() {
  const [selectedId, setSelectedId] = React.useState();
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // This method will delete a record
  async function deleteRecord(id) {
    alert(id);
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
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
  <tr>
    <td>{props.record.date}</td>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.rating}</td>
    <td>
{/* OG ADD/DELETE */}
      {/* <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | */}
      <button className="btn btn-link"
        onClick={() => {
          // setShowModal(true);
          props.deleteRecord(props.record._id);
        }}>Delete</button>

      <Link className="btn btn-primary" to={`/edit/${props.record._id}`}>Edit</Link>

      <button type="button" class="btn btn-primary ml-3" data-toggle="modal" data-target="#exampleModal" onClick={() => {
                  // idRef = props.record._id;
                  setSelectedId(props.record._id);
                  alert(selectedId);
              }}>
        Delete
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              {/* <h5 class="modal-title" id="exampleModalLabel">Woah!</h5> */}
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
                  alert(selectedId);
                  props.deleteRecord(selectedId);
                  // props.deleteRecord(props.record._id);
              }} data-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </td>
  </tr>
);

  // This following section will display the table with the records of individuals.
  return (
    <div style={{marginTop: 50, marginLeft: 100, marginRight: 100}}>
      <h3>My Diary</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th class="col-md-1">Date</th>
            <th class="col-md-2">Title</th>
            <th class="col-md-2">Review</th>
            <th class="col-md-1">Rating</th>
            <th class="col-md-1">Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>

    
  );
}