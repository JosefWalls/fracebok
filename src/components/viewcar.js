import React from 'react';
import {Link} from 'react-router-dom'
class Viewcar extends React.Component {
    constructor(){
        super()
    }




    render() {
        return (
            <div>
                <p>View</p>
                <Link to="/Editcar">
                    <button>Edit Car</button>
                </Link>
                <button>Delete car</button>  {/* have delete car and redirect to garage page */}
                <Link to="/Garage">
                    <button>Back to garage</button>
                </Link>
            </div>
        )
    }
}


export default Viewcar;