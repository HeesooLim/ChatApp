import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from './';
// import {CloseCreateChannel} from '../assets';
import './CreateChannel.scss';

const ChannelNameInput = ({ channelName = '', setChannelName, createType }) => {
    // const { client, setActiveChannel } = useChatContext();

    const handleChange = (e) => {
        <e className="prevent"></e>
        setChannelName(e.target.value);
    }
    return (
        <>
            {createType === 'messaging'
                ? (
                    <div className="channel-name-input__wrapper">
                        <input hidden value={channelName} onChange={handleChange} placeholder="channel-name" />
                        <p>Choose a Member to start a direct message</p>
                    </div>
                )
                : (
                    <div className="channel-name-input__wrapper">
                        <p>Name</p>
                        <input value={channelName} onChange={handleChange} placeholder="channel-name" />
                        <p>Add Members</p>
                    </div>
                )
            }
        </>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [channelName, setChannelName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
    const [selectedNames, setSelectedNames] = useState([]);


    const createChannel = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const newChannel = await client.channel(createType === 'group' ? 'team' : 'messaging', channelName, {
                name: channelName, members: selectedUsers,
            });

            await newChannel.watch();

            // reset the channel name
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        //   <CreateChannel createType={createType} setIsCreating={setIsCreating} />
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'messaging' ? 'Send a Direct Message' : 'Create a New Channel'}</p>
                <button onClick={() => {
                    setIsCreating(false);
                }}>&times;</button>
            </div>
            <ChannelNameInput createType={createType} setIsCreating={setIsCreating} channelName={channelName} setChannelName={setChannelName} setSelectedUsers={setSelectedUsers} />
            {/* {createType === 'messaging' && <ChannelNameInput isMessaging={true} channelName={channelName} setChannelName={setChannelName} setSelectedUsers={setSelectedUsers} />} */}
            <UserList setSelectedUsers={setSelectedUsers} />
            <button className="create-channel__button-wrapper" disabled={createType === 'messaging' && selectedUsers.length > 2} onClick={createChannel}>
                {createType === 'messaging' ? 'Create Message Group' : 'Create Channel'}
            </button>
        </div>
    )
}

export default CreateChannel