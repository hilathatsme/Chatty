import React, {Component} from 'react';
import Messages from './Messages';
import io from "socket.io-client";
import Avatar from 'react-avatar';

class Chat extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            users: [],
            message: '',
            messages: []
        };
        this.socket = io('localhost:8080');
        
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
    
        const addMessage = data => {
            const user = this.manageUsers(data.username);
            const newMessage = {
                user: user,
                text: data.text,
                timestamp:  data.timestamp
            };
            this.setState({messages: [...this.state.messages, newMessage]});
            this.updateScroll();
    
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.updateScroll = this.updateScroll.bind(this);
        this.manageUsers = this.manageUsers.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    onFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        e.target.placeholder = '';
    };

    updateScroll = () => {
        const messagesFlow = document.getElementById('messages');
        messagesFlow.scrollTop = messagesFlow.scrollHeight - messagesFlow.clientHeight;
    };
    
    manageUsers = username => {
        let user = {};
        const found = this.state.users.filter((user) => {
            return (username === user.name);
        });
        if(found.length > 0) {
            console.log('user found - ' +found[0].name);
            user = found[0];
        }
        else {
            const newAvatar = <Avatar name={username} round={true} size='30px' textSizeRatio='2'/>;
            const newUser = {
                name: username,
                avatar: newAvatar
            };
            this.setState({users: [...this.state.users, newUser]});
            console.log('new user added - ' + newUser.name);
            user = newUser;
        }
        return user;
    };
    
    sendMessage = e => {
        e.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            username: this.state.username,
            text: this.state.message,
            timestamp:  new Date()
        });
        this.setState({message: ''});
    };
    
    render() {
        return (
            <div className='main'>
                <div className='user-info'>
                    <input type='text'
                           name='username'
                           placeholder='username'
                           className='form-name'
                           value={this.state.username}
                           onChange={this.onFieldChange}
                           onFocus={this.onFieldChange}
                    />
                    <br/>
                    <textarea type='text'
                           name='message'
                           placeholder='message'
                           className='form-message'
                           value={this.state.message}
                           onChange={this.onFieldChange}
                           onFocus={this.onFieldChange}
                           rows={2}
                    />
                    <br/>
                    <button className='send-button'
                            onClick={this.sendMessage}
                    >
                        <span className='icon'/>
                    </button>
                    <div className="room-users">
                        <b>Who's in the room?</b>
                        {this.state.users.map( user => {
                            return <div>{user.name}<br/></div>
                        })}
                    </div>
                </div>
                <div className='chat-room'>
                    <Messages props={this.state} />
                </div>
            </div>
        );
    }
}
export default Chat;