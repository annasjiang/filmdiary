import Rating from '@mui/material/Rating';
import defaultposter from './search/defaultposter.jpeg';
import React, { useEffect, useState } from "react";

export default function Diary() {
  const [reviews, setReviews] = useState([]);

  // This method fetches the reviews from the database.
  useEffect(() => {
    async function getReviews() {
      const response = await fetch(`http://localhost:4000/review/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const reviews = await response.json();
      setReviews(reviews);
    }
    getReviews();
    return; 
  }, [reviews.length]);


  // This method will map out the reviews on the table
  function reviewList() {
    return reviews.map((review) => {
      return (
        <Review
          review={review}
          key={review._id}
        />
      );
    });
  }

  // get reviews
  const Review = (props) => (
    <a href={`/review/${props.review._id}`} style={{ textDecoration: 'none', color: 'black'}}>
    <tr> 
      {/* use thumbnails */}
      <td class="col-md-2">
        {
          props.review.poster === "http://localhost:3000/static/media/defaultposter.71253f31.jpeg" ? 
          (<img src={defaultposter} class="img-fluid" alt="poster"/>) : 
          (<img src={`http://image.tmdb.org/t/p/w185${props.review.poster.substring(34, 250)}`} class="img-fluid" alt="poster"/>)
        }
      </td>
      <td>
        <b style={{display: "inline", marginRight: 5}}>{props.review.name}</b>
        <p className='text-muted' style={{fontSize: 14, display: "inline"}}> ({props.review.year})</p> 
        <br></br>
        <p class="text-muted">watched on {props.review.date}</p>
        <Rating
            name="simple-controlled"
            defaultValue={props.review.rating}
            value={props.review.rating}
            size="small"
            readOnly/> <br></br>
        <p>{props.review.review}</p>
      </td>
    </tr>
    </a>
  );

  // display reviews
  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3>My Diary</h3>
      <table className="table table-hover" style={{ marginTop: 20 }}>
        <tbody>{reviewList()}</tbody>
      </table>
    </div>
  );
}
