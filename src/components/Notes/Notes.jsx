import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Notes.css';
import NoteItem from '../NoteItem/NoteItem';
import NoteForm from '../NoteForm/NoteForm';

export default class Notes extends Component {
    state = {
        notes: [],
        isLoading: true,
    };

    async componentDidMount() {
        await this.loadNotes();
    }

    loadNotes = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_NOTES_URL);
            if (!response.ok) {
                throw new Error('HTTP Error ' + response.status);
            }
            const notes = await response.json();
            this.setState({ notes, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    };

    addNote = async (note) => {
        try {
            const response = await fetch(process.env.REACT_APP_NOTES_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
            if (!response.ok) {
                throw new Error('HTTP Error ' + response.status);
            }
            await this.loadNotes();
        } catch (error) {
            console.error(error);
        }
    };

    removeNote = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('HTTP Error ' + response.status);
            }
            await this.loadNotes();
        } catch (error) {
            console.error(error);
        }
    };

    handleRefresh = () => {
        this.loadNotes();
    };

    render() {
        const { notes, isLoading } = this.state;

        if (isLoading) {
            return 'Loading';
        }

        return (
            <div className="notes-container">
                <div className="notes-update">
                <h2 className="notes-title">Notes</h2>
                <button className="refresh-button" onClick={this.handleRefresh}>
                    <div className="refresh-icon">
                    <i className="fas fa-sync-alt"></i>
                    </div>
                </button>
                </div>

                <div className="notes-group" id={this.props.id}>
                {notes.map((note) => (
                    <NoteItem key={note.id} note={note} onRemoveNote={this.removeNote} />
                ))}
                </div>

                <NoteForm onAddNote={this.addNote} />
            </div>
        );
    }
}
