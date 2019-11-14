import React from 'react';
import {Link} from 'react-router-dom'
import {getUserPhotos} from "./../daffy_duck/photoReducer"
import {connect} from 'react-redux'

class Photos extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async() => {
        await this.props.getUserPhotos()
    }

    render(){
        const mappedImages = this.props.userImages && this.props.userImages.map((val, i) => {
            return (
                <div className="mapped">
                    <Link to={`/Viewphoto/${val.photo_id}`}>
                    <img className="carImage" src={val.link}></img>
                    </Link>
                    <h4>{val.title}</h4>
                </div>
            )
        })
        return (
            <div className="main">
                <Link to="/Addphoto">
                    <button>Add a Photo </button>
                </Link>
                <Link to="/Profile">
                    <button>Back to Profile</button>
                </Link>
                <div className="garage">
                {mappedImages}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userImages: reduxState.PhotoReducer.userImages
    }
}

export default connect(mapStateToProps, {getUserPhotos})(Photos)