import React, { Component } from 'react';
import noPoster from '../../images/noPoster.png'
import './movieTile.css'
import { Row, Image, Container } from 'react-bootstrap';
//import {withAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';//, withRouter } from 'react-router-dom';
import FavButton from '../favButton/favButton';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

const POSTER_SIZE = 'w500/'

class MovieTile extends Component{

    constructor(props){
        super(props)
        this.state={
            loaded: false,
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    render() {
        const title = this.props.movie.title
        let poster_url
        (this.props.movie.poster_path == null) ? poster_url= noPoster : poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.props.movie.poster_path

        return(
            <div className='tile' style={this.state.loaded ? {} : {display: 'none'}}>
                <div>
                    <Row id='img'>
                    <Link to={{
                                pathname: '/movie/'+this.props.movie.id,
                                state: { isFav: this.props.isFav }
                            }}>
                        <Image 
                            src={poster_url} 
                            fluid className='tile-img' 
                            onLoad={() => this.setState({loaded: true})}
                        />
                    </Link>
                    </Row>
                    <Row id='text'>
                        <Container style={{border: '0px'}}>
                            <h5 className="title">{title}</h5>
                        </Container>
                    </Row>  
                </div>
                <Row id='favButton'>
                    <div className="d-grid gap-2">
                        {<FavButton isFav={this.props.isFav} id={this.props.movie.id}/>}
                    </div>
                </Row>
            </div>
        )
    }
}

export default withRouter((MovieTile))