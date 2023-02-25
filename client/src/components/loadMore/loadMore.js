import React, { Component } from 'react';
import './loadMore.css'

class LoadMore extends Component{
    render(){
        return(
            <div className="loadMore" onClick={this.props.onClick}>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

export default LoadMore