import React, {Component} from 'react';

export default class Task extends Component {
    render(){
        return (
            <tr>
                <td>{this.props.taskName}</td>
                <td colSpan={4} />
            </tr>
        )
    }
}
