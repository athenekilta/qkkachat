import React from "react";
import axios from "axios";
import "./Admin.css";

let intervalmagic;

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchInfo() {
    axios
      .get("/messages")
      .then(res => res.data.data)
      .then(res => console.log(res));
  }

  componentWillMount() {
    console.log("yay1 mounted");
    // intervalmagic = setInterval(this.fetchInfo, 1000);
  }

  componentWillUnmount() {
    clearInterval(intervalmagic);
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

    axios.post("/messages", messageInfo).then(res => {
      console.log(res);
    });

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
