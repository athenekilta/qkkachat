import React from 'react';
import './Main.css';
import axios from 'axios'
function leftPad(value, length) {
    return (value.toString().length < length) ? leftPad("0" + value, length) : value;
}
class Message extends React.Component {
    constructor(props) {
        super(props);

    }

    parseTime(date) {
        let dateObject = new Date(date)
        console.log(dateObject)
        return leftPad(dateObject.getHours(), 2) + ":" + leftPad(dateObject.getMinutes(), 2) + ":" + leftPad(dateObject.getSeconds(), 2)
    }
    render() {
        return (
            <div class="message"> {this.parseTime(this.props.msg.timestamp)}: {this.props.msg.msg}</div >
        )
    }
}
let interval = null;
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            now: "",
            speaker: "",
            supervisor: "",
            next: ""
        }
        this.getMessages = this.getMessages.bind(this);
    }

    getMessages() {
        axios.get("/messages")
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    let messages = response.data.data.map(x => {
                        return ({
                            "msg": x.text,
                            "isAdmin": x.admin,
                            "timestamp": x.date
                        })
                    })
                    this.setState({ messages: messages })
                }
            })
    }
    componentDidMount() {
        interval = window.setInterval(this.getMessages, 1000)


        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    var video = document.querySelector('#video');
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    }
    componentWillUnmount() {
        clearInterval(interval)
    }
    render() {
        console.log(this.state)
        return (
            <div style={{ display: "flex" }}>
                <div id="left">
                    <video id="video" autoPlay>Haetaan kuvaa</video>
                    <div id="other">
                        <div id="info">

                            <div id="name">Qkkachat</div>
                            <div id="contact">
                                <div id="phone">TG: @Qkkachat</div>
                            </div>
                        </div>

                        <div id="status">
                            <div className="row">
                                Nyt: <span id="status-now"></span>
                            </div>
                            <div className="row">
                                Juontaa: <span id="status-host"></span>
                            </div>
                            <div className="row">
                                Valvoo: <span id="status-supervisor"></span>
                            </div>
                            <br />
                            <div className="row">
                                Seuraavaksi: <span id="status-next"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="message-container">
                    <div id="messages">
                        <h2>Viestit studioon</h2>
                        {this.state.messages.map(msg => {

                            return <Message msg={msg}></Message>
                        })}
                    </div>



                </div>
            </div>
        )
    }

}

export default Main
