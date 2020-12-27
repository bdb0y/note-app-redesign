import React, {Component} from 'react'
import './style/Dashboard.css'
import Menu from './Menu'
import Note from "./Note";

class Dashboard extends Component {

    render() {
        return (
            <div className="dash-holder">
                <Menu addNote={this.props.addNote} searchValue={this.props.searchValue} onSearch={this.props.onSearch}/>
                {this.props.notes.map((note) => (
                    <Note key={note.id} note={note} setSelected={this.props.setSelected}/>
                ))}
            </div>
        );
    }
}

export default Dashboard;
