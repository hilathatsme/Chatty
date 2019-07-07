import React from 'react';

const Message = ({message}) => {
    console.log(message);
    return  <div className='message'>
        <span className='avatar'>{message.user.avatar}</span>
        <b>{message.user.name}</b>:&nbsp;
        {message.text}
        <br/>
    </div>
};
export default Message;