import React from "react";

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  updateInfo() {
    const info = {
      now: document.getElementById("now").value,
      next: document.getElementById("next").value,
      moderator: document.getElementById("moderator").value
    };
    console.log(info);
  }
  sendMessage() {
    const messageInfo = {
      text: document.getElementById("message").value,
      admin: document.querySelector("#admin").checked
    };
    console.log(messageInfo);
  }
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <h2>infot</h2>
        Nyt
        <input id="now" />
        <br />
        Seuraavaks
        <input id="next" />
        <br />
        Valvoo
        <input id="moderator" />
        <br />
        <button onClick={this.updateInfo}>Päivitä yläpuolen infot</button>
        <div>
          <h2>Joku pelle haluu laittaa viestiä</h2>
          Viestiä
          <textarea id="message" rows="4" cols="50" />
          <br />
          Oox admin
          <input id="admin" type="checkbox" />
          <br />
          Paina nappulaa
          <button onClick={this.sendMessage}>Tätä nappulaa </button>
        </div>
      </div>
    );
  }
}

export default Admin;
