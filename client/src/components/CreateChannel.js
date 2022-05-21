import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

// import {UserList} from './';
// import {CloseCreateChannel} from '../assets';
import './CreateChannel.scss';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (e) => {
        <e className="prevent"></e>
        setChannelName(e.target.value);
    }
    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>

    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const [channelName, setChannelName] = useState('');
    
    return (
        //   <CreateChannel createType={createType} setIsCreating={setIsCreating} />
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'group' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                {/* <CloseCreateChannel setIsCreating={setIsCreating} /> */}
                <button onClick={() => {
                    setIsCreating(false);
                }}>&times;</button>
            </div>
            {createType === 'group' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
        </div>
    )
}

export default CreateChannel