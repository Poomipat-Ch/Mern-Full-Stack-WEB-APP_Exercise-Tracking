import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component{
    constructor(props){
        super (props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(res => {
            this.setState({
                users: res.data
            })
        })
        .catch(err => console.log(err));
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const users = {
            username: this.state.username
        }
        
        console.log(users);

        axios.post('http://localhost:5000/users/add', users)
        .then(res => console.log(res.data))

        this.setState({
            username: ''
        });

        window.location = '/';
    }

    deleteUser(id){
        axios.delete('http://localhost:5000/users/'+id)
        .then(res => console.log(res.data));
        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        });
    }

    render(){
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required 
                        minLength="4"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success"/>
                    </div>
                </form>
                <h1>List Users</h1>
                <table className="table center user-table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.users.map( currentUser => {
                             return (
                                <tr>
                                    <td>{currentUser.username}</td> 
                                    <td>
                                        <a href="#" onClick={() =>  this.deleteUser(currentUser._id)}><button type="button" class="btn btn-danger">delete</button></a>
                                    </td>
                                </tr>
                             )
                        }) }    
                    </tbody>  
                </table>
            </div>
            )
    }
}