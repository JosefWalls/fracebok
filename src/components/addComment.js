import React from "react";



class AddComment extends React.Component {
    constructor(){
        super()
    }

    componentDidMount = async() => {
        console.log(this.props)
    }

    render(){
        return (
            <div>
                <h1>Add Comment</h1>
            </div>
        )
    }
}


export default AddComment;