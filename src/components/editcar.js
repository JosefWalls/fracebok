import React from 'react';
import {Link} from 'react-router-dom'

class EditCar extends React.Component {
    constructor(){
        super()
    }




    render(){
        return(
            <div>
                <p>Edit car</p>
                <Link to="/Viewcar">
                    <button>Back to Vehicle</button>
                </Link>
            </div>
        )
    }
}


export default EditCar