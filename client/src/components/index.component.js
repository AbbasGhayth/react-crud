import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.onChangeKeyword = this.onChangeKeyword.bind(this);

        this.state = {
            contact: [],
            keyword:''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/contact').then(response => {
            this.setState({contact: response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }
    
    componentDidUpdate() {
        axios.get('http://localhost:4000/contact').then(response => {
            this.setState({ contact: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeKeyword(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    tabRow() {
        return this.state.contact.filter(state=>{
            return state.contact_name.includes(this.state.keyword);
        }).map(function(object, i){
            return <TableRow obj={object} key={i}/>;
        });
    }

    componentWillUnmount() {
        this.setState = ()=>false;
    }
    
    render() {
       return (
            <div>
                <h3 align="center">Contact List</h3>
                <input className="form-control" placeholder="Search" type="text" 
                    value={this.state.keyword}
                    onChange={this.onChangeKeyword}
                />
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Contact Name</th>
                            <th>Contact Number</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        ) 
    }
}