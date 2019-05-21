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

    }

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
            const newAvatar = <Avatar name={username} round={true} size="20px"/>;
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
            <div>
                <div className='chat-room'>
                    <Messages props={this.state} />
                </div>
                <div className='user-info'>
                    <input type='text'
                           placeholder='username'
                           className='form-name'
                           value={this.state.username}
                           onChange={e => this.setState({username: e.target.value})}
                    />
                    <br/>
                    <input type='text'
                           placeholder='message'
                           className='form-message'
                           value={this.state.message}
                           onChange={e => this.setState({message: e.target.value})}
                    />
                    <br/>
                    <button className='send-button'
                            onClick={this.sendMessage}
                    >Send</button>
                </div>
            </div>
        );
    }
}
export default Chat;