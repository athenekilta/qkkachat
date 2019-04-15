import React from "react";
import "./Main.css";
import axios from "axios";
import logo from "./logo.png";
function leftPad(value, length) {
  return value.toString().length < length
    ? leftPad("0" + value, length)
    : value;
}
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  parseTime(date) {
    return (
      leftPad(date.getHours(), 2) +
      ":" +
      leftPad(date.getMinutes(), 2) +
      ":" +
      leftPad(date.getSeconds(), 2)
    );
  }
  render() {
    return (
      <div class={this.props.msg.isAdmin ? "message admin" : "message"}>
        {" "}
        {this.props.msg.isAdmin ? "VALVOJA: " : ""}
        {this.parseTime(this.props.msg.timestamp)}: {this.props.msg.msg}
      </div>
    );
  }
}
let interval = null;
let interval2 = null;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      now: "",
      speaker: "",
      moderator: "",
      next: ""
    };
    this.getMessages = this.getMessages.bind(this);
  }
  updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
  }
  getMessages() {
    axios.get("/messages?$sort[date]=1&$limit=100").then(response => {
      if (response.status === 200) {
        let messages = response.data.map(x => {
          return {
            msg: x.text,
            isAdmin: x.admin,
            timestamp: new Date(x.date)
          };
        });
        this.setState({
          messages: messages.sort((x, y) => x.timestamp - y.timestamp)
        });
      }
    });
    this.updateScroll();
  }

  getStatus() {
    axios.get("status").then(response => {
      axios
        .get("/status")
        .then(res => res.data[0])
        .then(res => {
          document.getElementById("status-now").innerHTML = res.now;
          document.getElementById("status-host").innerHTML = res.host;
          document.getElementById("status-moderator").innerHTML = res.moderator;
          document.getElementById("status-next").innerHTML = res.next;
          console.log(res.now);
        })
        .catch(err => console.log(err));
    });
  }

  componentDidMount() {
    interval = window.setInterval(this.getMessages, 1000);
    interval2 = window.setInterval(this.getStatus, 2000);
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          var video = document.querySelector("#video");
          video.srcObject = stream;
        })
        .catch(function(err0r) {
          console.log("Something went wrong!");
        });
    }
  }
  componentWillUnmount() {
    clearInterval(interval1);
    clearInterval(interval2);
  }
  render() {
    console.log(this.state);
    return (
      <div className="mainContainer" style={{ display: "flex" }}>
        <div id="left">
          <div className="atheneLogoContainer">
            <img src={logo} className="atheneLogo" />
          </div>
          <video id="video" autoPlay>
            Haetaan kuvaa
          </video>

          <div id="other">
            <marquee id="marquee1">
              <div id="status">
                Nyt: <span id="status-now" /> &nbsp; Juontaa:{" "}
                <span id="status-host" /> &nbsp; Valvoo:{" "}
                <span id="status-moderator" /> &nbsp; Seuraavaksi:{" "}
                <span id="status-next" /> &nbsp;
              </div>
            </marquee>
            <marquee id="marquee2" direction="right">
              <span>Qkkachat</span> &nbsp; &nbsp;
              <span>TG: @Qkkachat</span> &nbsp; &nbsp;
              <span>Call: +358 41 704 8608</span>
            </marquee>
          </div>
        </div>
        <div id="message-container">
          <div id="messages">
            <h3>Viestit studioon</h3>
            {this.state.messages.map(msg => {
              return <Message msg={msg} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
