import React, {Component} from 'react'
import './App.css';
//components
import Dashboard from './components/layouts/Dashboard'
import NoteEditor from "./components/layouts/NoteEditor";
//font-stuff
import {library} from "@fortawesome/fontawesome-svg-core";

import {fab} from "@fortawesome/free-brands-svg-icons"
import {faPlusSquare, faTrashAlt, faArrowLeft} from "@fortawesome/free-solid-svg-icons"

library.add(fab, faPlusSquare, faTrashAlt, faArrowLeft)

//styling

class App extends Component {

    constructor(props) {
        super(props);
        this.isPhone = this.isPhone.bind(this);
        this.returnToHomePage = this.returnToHomePage.bind(this);
    }

    state = {
        notes: [
            {
                id: 0,
                note: 'this note is selected'
            },
            {
                id: 1,
                note: '2this note is selected2'
            },
            {
                id: 2,
                note: 'this note is selected3'
            }
        ],
        selected: null,
        searchKey: '',
        phone: false,
        homePage: true,
        width: window.innerWidth,
        height: window.innerHeight
    };

    updateNotes = (theNote) => {
        const {id, note} = theNote;
        const updatedNote = {
            id,
            note
        }
        let notes = this.state.notes;
        for (let i = 0; i < notes.length; i++)
            if (notes[i].id === id) {
                notes[i] = updatedNote;
            }
        this.setState({selected: theNote})
        this.setState({notes: notes})
    }

    getSelectedNote = () => {
        let note = this.state.selected;
        if (note === null) {
            let preferredNote = this.state.notes[0];
            this.setState({selected: preferredNote})
            return preferredNote;
        } else return note;

    }

    changeStateToSelected = (note) => {
        let notes = this.state.notes;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].note === '') {
                notes.splice(i, 1);
            }
        }
        this.setState({notes: notes, selected: note, homePage: false});
    }

    addNote = () => {
        let note = {
            id: this.state.notes.length,
            note: ''
        }
        if (this.isPhone())
            this.setState({notes: [...this.state.notes, note], selected: note, homePage: false});
        else this.setState({notes: [...this.state.notes, note], selected: note});
    }

    onSearch = (key) => {
        this.setState({searchKey: key.target.value});
    }

    getNotes = () => {
        let key = this.state.searchKey;
        if (key.length > 0)
            return this.state.notes.filter(note => note.note.toString().includes(key));
        else
            return this.state.notes;
    }

    onDeleteNote = () => {
        let selected = this.state.selected;
        if (selected != null) {
            let notes = this.state.notes;
            for (let i = 0; i < notes.length; i++)
                if (notes[i].id === this.state.selected.id)
                    notes.splice(i, 1);

            this.setState({
                notes: notes, selected: notes.length > 0 ? notes[notes.length - 1] : null,
                homePage: true
            });
        } else alert('nothing to delete!');
    }

    isPhone() {
        let theWidth = this.state.width;
        return theWidth <= 568;
    }

    returnToHomePage() {
        this.setState({homePage: true});
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <div className="app-container">
                {!this.isPhone() ? (
                        <>
                            <Dashboard className="dash" notes={this.getNotes()} setSelected={this.changeStateToSelected}
                                       addNote={this.addNote} searchValue={this.state.searchKey} onSearch={this.onSearch}/>
                            <NoteEditor className="note-editor" selectedNote={this.getSelectedNote()}
                                        updateNote={this.updateNotes} goBack={this.returnToHomePage}
                                        onDeleteNote={this.onDeleteNote}/>
                        </>)
                    :
                    (
                        <>
                            {this.state.homePage ? (
                                    <Dashboard className="dash" notes={this.getNotes()}
                                               setSelected={this.changeStateToSelected}
                                               addNote={this.addNote} searchValue={this.state.searchKey}
                                               onSearch={this.onSearch}/>
                                )
                                :
                                (
                                    <NoteEditor className="note-editor" selectedNote={this.getSelectedNote()}
                                                updateNote={this.updateNotes} goBack={this.returnToHomePage}
                                                onDeleteNote={this.onDeleteNote}/>
                                )}
                        </>
                    )}
            </div>
        );
    }
}

export default App;
