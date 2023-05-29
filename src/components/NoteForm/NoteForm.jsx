import React, { Component } from 'react';
import './NoteForm.css';
import { nanoid } from 'nanoid';

export default class NoteForm extends Component {
    state = {
        newNote: '',
    };

    handleInputChange = (e) => {
        this.setState({ newNote: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { newNote } = this.state;
        const note = {
            id: nanoid(),
            content: newNote,
        };

        try {
            await this.props.onAddNote(note);
            this.setState({ newNote: '' });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { newNote } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="form-note">
                <label htmlFor="name" className="form-label">
                    New Note:
                </label>
                <textarea
                    id="name"
                    className="note-input"
                    value={newNote}
                    onChange={this.handleInputChange}
                />
                <button type="submit" className="add-note-button">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </form>
        );
    }
}
