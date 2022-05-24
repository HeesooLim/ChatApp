import React from "react";
import { Channel, MessageTeam } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from './';
import './ChannelContainer.scss';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType, isChannelListOpen }) => {
  if (isCreating) {
    return (
      <div className={(isChannelListOpen ? "list-open" : "") + " channel__container"}>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className={(isChannelListOpen ? "list-open" : "") + " channel__container"}>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">This is the beginning of your chat.</p>
      <p className="channel-empty__second">Send messages, attachments, links. emojis, and more!</p>
    </div>
  )

  return (
    <div className={(isChannelListOpen ? "list-open" : "") + " channel__container"}>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>

    </div>
  )
}

export default ChannelContainer