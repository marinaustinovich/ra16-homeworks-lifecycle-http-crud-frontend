import React, { Component } from 'react';
import './NoteItem.css';

type NoteItemProps = {
  note: {
    id: string;
    content: string;
  };
  onRemoveNote: (id: string) => void;
};

export default class NoteItem extends Component<NoteItemProps> {
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
