import React, {Component} from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            contact_name: '',
            contact_number:''
        }
    }

    componentDidMount() {
    axios.get('http://localhost:4000/contact/edit/'+this.props.match.params.id)
        .then(response => {
            this.setState({ 
                contact_name: response.data.contact_name, 
                contact_number: response.data.contact_number 
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeContactName(e) {
        this.setState({
            contact_name: e.target.value
        });
    }

    onChangeContactNumber(e) {
        this.setState({
            contact_number: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            contact_name: this.state.contact_name,
            contact_number: this.state.contact_number
        };
        axios.post('http://localhost:4000/contact/update/'+this.props.match.params.id, obj)
        .then(res => {
            this.setState({ locations: res.data });
            this.props.history.push("/index");
        })
        .catch(error => console.log(error));
    }
    
    render() {
       return (
        <div style={{marginTop: 10}}>
            <h3>Update Contact</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Contact Name</label>
                    <input type="text" className="form-control"
                        value={this.state.contact_name}
                        onChange={this.onChangeContactName}
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" className="form-control"
                        value={this.state.contact_number}
                        onChange={this.onChangeContactNumber}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Contact" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        ) 
    }
}