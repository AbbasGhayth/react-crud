import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.get('http://localhost:4000/contact/delete/'+this.props.obj._id)
            .then(()=>console.log("deleted"))
            .catch(err => console.log(err));
            console.log("test");
    }
    render(){
        return (
            <tr>
                <td>
                    {this.props.obj.contact_name}
                </td>
                <td>
                    {this.props.obj.contact_number}
                </td>
                <td>
                    <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;