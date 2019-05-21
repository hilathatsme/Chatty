import React from 'react';
import Message from "./Message";

const Messages = ({props}) => {
    return (
    <div className='messages' id='messages'>
        {props.messages &&
        props.messages.map((message) => {
            return <Message key={message.timestamp} message={message}/>
        })
        }
    </div>
    )
};

export default Messages;