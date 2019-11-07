import React from 'react';
import {Link} from 'react-router-dom'

class Races extends React.Component {
    constructor(){
        super()
    }



    render(){
        return (
            <div>
                <h1>Races</h1>
                <Link to="/Profile">
                    <button>Back to Profile</button>
                </Link>
                <div>
                    <h1>By Tracks:</h1>
                    <Link to="/Addtrack">
                        <button>Add Track</button>
                    </Link>
                </div>
            </div>
        )
    }
}


export default Races;

