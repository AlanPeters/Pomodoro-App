import React, {Component} from 'react';

export default class Task extends Component {
    render(){
        return (
            <tr>
                <td>{this.props.taskName}</td>
                <td colSpant={4} />
            </tr>
        )
    }
}
