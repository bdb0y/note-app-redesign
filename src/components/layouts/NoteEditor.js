import React, {Component} from 'react'
import TopMenu from './TopMenu.js'
import './style/NoteEditor.css'

let ourNote = null;

class NoteEditor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        ourNote.note = e.target.value;
        this.props.updateNote(ourNote);
    }

    render() {
        ourNote = null;
        let selected = this.props.selectedNote;
        if (selected != null) {
            ourNote = {
                id: selected.id,
                note: selected.note
            }
        }
        return (
            <div className="note-editor-holder">
                <TopMenu goBack={this.props.goBack} onDelete={this.props.onDeleteNote}/>
                <div className="note-container">
                    <textarea name="note" placeholder="enter your text here..." value={ourNote != null ? ourNote.note
                        : 'NO NOTE AVAILABLE, CREATE A NEW NOTE.'}
                              onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default NoteEditor;
