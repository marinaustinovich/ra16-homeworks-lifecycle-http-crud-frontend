import React, { Component } from 'react';
import './NoteItem.css'

export default class NoteItem extends Component {
    handleRemove = () => {
        const { note, onRemoveNote } = this.props;
        onRemoveNote(note.id);
    };

    render() {
        const { note } = this.props;

        return (
            <div className="note-item" id={note.id}>
                <button className="remove-button" onClick={this.handleRemove}>
                    &#10005;
                </button>
                {note.content}
            </div>
        );
    }
}
