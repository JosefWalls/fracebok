import React from 'react';
import {Link} from "react-router-dom"
import {loginUser, updateState, resetFields} from "./../daffy_duck/loginRegisterReducer"
import {connect} from "react-redux";
import "./scss/login.css"

class Login extends React.Component {

        state = {
            error: false,
            alertBox: "alertBoxOpen"
        }

        handleChange = e => {
            this.props.updateState({[e.target.name]: e.target.value})
        }
        
        handleClick = (e) => {
            e.preventDefault();
            this.props.loginUser(this.props.username, this.props.password)
            .then(() => {
                // alert("Correct")
                this.props.history.push("/Profile")
                this.props.resetFields()
            })
            .catch(() =>{
                this.setState({error: true})
            })
        }

        closeAlert = () => {
            if(this.state.alertBox === "alertBoxOpen"){
                this.setState({alertBox: "alertBoxClosed"})
            }
        }
    render(){
        return (
    
            <div className="main">
                <div className="header">
                    <p id="logo">Fracebok</p>
                </div>
                <div className={this.state.alertBox}>
                    <h1>Welcome to Fracebok!</h1>
                    <p>Our site is currently under construction, our page styling being reworked, as well as new features such as <span>Comments, </span><span>Notifications, </span> and <span> much much more </span> being added!</p>
                    <button onClick={this.closeAlert}>Close</button>
                </div>
            <section className="loginbox">
                <div className="loginInputs">
                    <input placeholder="Enter username" name="username" onChange={this.handleChange} ></input>
                    <input placeholder="Enter password" name="password" onChange={this.handleChange} type="password"></input>
                </div>
                <div className="loginButtons">
                    <Link to="/Profile">
                        <button onClick={this.handleClick} className="loginPageButtons">Login</button>
                    </Link>
                    <Link to="/Register">
                        <button className="loginPageButtons">Register</button>
                    </Link>
                </div>
            </section>
            
            {this.state.error === true ? <h1 >Incorrect login</h1>: null}
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.loginRegisterReducer.username,
        password: reduxState.loginRegisterReducer.password
    }
}

export default connect(mapStateToProps, {updateState, loginUser, resetFields})(Login);