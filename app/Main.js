import React from 'react';
import './Main.css';

function leftPad(value, length) {
    return (value.toString().length < length) ? leftPad("0" + value, length) : value;
}
class Message extends React.Component {
    constructor(props) {
        super(props);

    }

    parseTime(date) {
        return leftPad(date.getHours(), 2) + ":" + leftPad(date.getMinutes(), 2) + ":" + leftPad(date.getSeconds(), 2)
    }
    render() {
        return (
            <div class="message"> {this.parseTime(this.props.msg.timestamp)}: {this.props.msg.msg}</div >
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [
                {
                    msg: "Moro",
                    timestamp: new Date(),
                    isAdmin: false
                },
                {
                    msg: "Miten menee Miten menee Miten menee Miten menee",
                    timestamp: new Date(),
                    isAdmin: false
                }],
            now: "",
            speaker: "",
            supervisor: "",
            next: ""
        }
    }
    componentDidMount() {



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
    render() {
        return (
            <div style={{ display: "flex" }}>
                <div id="left">
                    <video id="video" autoPlay>Haetaan kuvaa</video>
                    <div id="other">
                        <div id="info">
                            <img src="athene_logo.png" alt="" />
                            <div id="name">Qkkachat</div>
                            <div id="contact">
                                <div id="phone">TG: @Qkkachat</div>
                            </div>
                        </div>

                        <div id="status">
                            <div class="row">
                                Nyt: <span id="status-now"></span>
                            </div>
                            <div class="row">
                                Juontaa: <span id="status-host"></span>
                            </div>
                            <div class="row">
                                Valvoo: <span id="status-supervisor"></span>
                            </div>
                            <br />
                            <div class="row">
                                Seuraavaksi: <span id="status-next"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="message-container">
                    <div id="messages">
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
