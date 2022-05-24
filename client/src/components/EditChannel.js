import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
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

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update({name: channelName}, {text: `channel name changed to ${channelName}`});

    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <button onClick={() => {
          setIsEditing(false);
        }}>&times;</button>
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="edit-channel__button-wrapper">
        <button onClick={updateChannel}>Save Changes</button>
      </div>
    </div>
  )
}

export default EditChannel