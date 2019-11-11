import React from 'react';
import {Link} from 'react-router-dom';
import {storage} from "./../firebase-config";
import {connect} from 'react-redux'
import {updateState} from "./../daffy_duck/photoReducer"

class Photos extends React.Component {
    constructor(){
        super()

       
    }

    componentDidMount(){
        const random = (Math.random() *  254999999)
        this.props.updateState({session_id: random})
    }

    handleChange = (e) => {
        this.props.updateState({[e.target.name]: e.target.value})
    }

   render(){
       return (
           <div>
               <input placeholder="Enter Title" name="title" onChange={this.handleChange}></input>
               <input placeholder="Enter Description" name="description" onChange={this.handleChange}></input>
               <input placeholder="Enter Track" name="track" onChange={this.handleChange}></input>
               <input type="file"></input>
           </div>
       )
   }
}

const mapStateToProps = reduxState => {
    return {
        title: reduxState.PhotoReducer.title,
        description: reduxState.PhotoReducer.description,
        track: reduxState.PhotoReducer.track,
        session_id: reduxState.PhotoReducer.session_id
    }
}


export default connect(mapStateToProps, {updateState})(Photos)
