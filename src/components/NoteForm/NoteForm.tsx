import React, { Component, ChangeEvent, FormEvent } from "react";
import "./NoteForm.css";
import { nanoid } from "nanoid";

export type Note = {
  id: string;
  content: string;
};

type NoteFormProps = {
  onAddNote: (note: Note) => Promise<void>;
};

type NoteFormState = {
  newNote: string;
};

export default class NoteForm extends Component<NoteFormProps, NoteFormState> {
  state: NoteFormState = {
    newNote: "",
  };

  handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newNote: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newNote } = this.state;
    const note: Note = {
      id: nanoid(),
      content: newNote,
    };

    try {
      await this.props.onAddNote(note);
      this.setState({ newNote: "" });
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
