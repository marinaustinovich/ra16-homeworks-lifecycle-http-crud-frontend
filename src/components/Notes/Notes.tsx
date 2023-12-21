import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Notes.css";
import NoteItem from "../NoteItem/NoteItem";
import NoteForm, { Note } from "../NoteForm/NoteForm";

const apiUrl = process.env.REACT_APP_NOTES_URL;

type NotesState = {
  notes: Note[];
  isLoading: boolean;
};

type NotesProps = {
  id: string;
};

export default class Notes extends Component<NotesProps, NotesState> {
  state: NotesState = {
    notes: [],
    isLoading: true,
  };

  async componentDidMount() {
    await this.loadNotes();
  }

  loadNotes = async () => {
    if (!apiUrl) {
      console.error("REACT_APP_NOTES_URL is not defined");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/notes`);
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      const notes = await response.json();
      this.setState({ notes, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };

  addNote = async (note: Note) => {
    if (!apiUrl) {
      console.error("REACT_APP_NOTES_URL is not defined");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      await this.loadNotes();
    } catch (error) {
      console.error(error);
    }
  };

  removeNote = async (id: string) => {
    if (!apiUrl) {
      console.error("REACT_APP_NOTES_URL is not defined");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
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
    const { id } = this.props;

    if (isLoading) {
      return "Loading";
    }

    if (isLoading) {
      return "Loading";
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

        <div className="notes-group" id={id}>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onRemoveNote={this.removeNote}
            />
          ))}
        </div>

        <NoteForm onAddNote={this.addNote} />
      </div>
    );
  }
}
