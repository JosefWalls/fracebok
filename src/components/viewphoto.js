import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux';
import {viewImage} from "./../daffy_duck/photoReducer"


class ViewPhoto extends React.Component {
    constructor(){
        super()
    }

    componentDidMount () {
        const photo_id = this.props.match.params.photo_id
        this.props.viewImage(photo_id)
    }
    
    
    render(){
        const mappedImage = this.props.image.map((val, i) => {
            return (
                <div className="mapped">
                    <img className="carImage" src={val.link}></img>
                        <h1>{val.title}</h1>
                    <p>{val.description}</p>
                </div>
            )
        })
        console.log(this.props.image)
        return (
            <div>
                <h1>View photo</h1>
                {mappedImage}
                <Link to="/Photos">
                    <button>Back to Images</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        image: reduxState.PhotoReducer.image
    }
}

export default connect(mapStateToProps, {viewImage})(ViewPhoto);