import React, {Component} from 'react'
import './style/Note.css'

class Note extends Component {

    sendSelf = () => {
        this.props.setSelected(this.props.note);
    }

    render() {
        const {note} = this.props.note;

        let value = note.toString();
        if (value.length > 17)
            value = value.substr(0, 17) + '...'
        else if(value.length === 0) value = '[EMPTY_NOTE]';

        return (
            <div className="note-holder" onClick={this.sendSelf}>
                <span>{value}</span>
                <hr/>
            </div>
        );
    }
}

export default Note;
