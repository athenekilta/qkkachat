import React from "react";
import axios from "axios";
import "./Admin.css";

let intervalmagic;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: "",
      host: "",
      moderator: "",
      next: "",
      id: null
    };
  }

  fetchStatus() {
    axios
      .get("/status")
      .then(res => {
        console.log(res.data.data);
        let data = res.data.data;
        if (data.length > 0) {
          this.setState({
            now: data[0].now,
            host: data[0].host,
            moderator: data[0].moderator,
            next: data[0].next,
            id: data[0]._id
          });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    console.log("yay1 mounted");
    this.fetchStatus();
  }

  componentWillUnmount() {
    clearInterval(intervalmagic);
  }

  updateInfo = () => {
    const info = {
      now: document.getElementById("now").value,
      next: document.getElementById("next").value,
      moderator: document.getElementById("moderator").value,
      host: document.getElementById("host").value
    };
    if (this.state.id) {
      axios.patch("/status/" + this.state.id, info).then(res => {
        console.log(res);
      });
    } else {
      axios.post("/status", info).then(res => {
        console.log(res);
        this.fetchStatus();
      });
    }
  };
  sendMessage() {
    const messageInfo = {
      text: document.getElementById("message").value,
      admin: document.querySelector("#admin").checked,
      date: new Date()
    };

    axios.post("/messages", messageInfo).then(res => {
      console.log(res);
    });

    console.log(messageInfo);
  }
  render() {
    console.log(this.state);
    return (
      <div className="adminContainer">
        <h1>Admin</h1>
        Nyt
        <input id="now" defaultValue={this.state.now} />
        <br />
        Valvoo
        <input id="moderator" defaultValue={this.state.moderator} />
        <br />
        Juontaa
        <input id="host" defaultValue={this.state.host} />
        <br />
        Seuraavaks
        <input id="next" defaultValue={this.state.next} />
        <br />
        <button onClick={this.updateInfo}>Päivitä yläpuolen infot</button>
        <div>
          <h2>Lisää viesti</h2>
          <textarea id="message" rows="4" cols="50" />
          <br />
          Viesti valvojalta
          <input id="admin" type="checkbox" />
          <br />
          <button onClick={this.sendMessage}>Lähetä </button>
        </div>
      </div>
    );
  }
}

export default Admin;
