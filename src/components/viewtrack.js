import React from "react";
import {Link} from 'react-router-dom'

class Viewtrack extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        // console.log(this.props.match.params)
    }

    render(){
        return (
            <div>
                <h1>View track</h1>
                <Link to="/Races">
                    <button>Back to all tracks</button>
                </Link>
            </div>
        )
    }
}


export default Viewtrack