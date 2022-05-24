import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import "./App.css";
import "stream-chat-react/dist/css/index.css";

const apiKey = "5tz97k3vn5zd";

const client = StreamChat.getInstance(apiKey);

const cookies = new Cookies();
const authToken = cookies.get("token");

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken);
}

function App() {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChannelListOpen, setIsChannelListOpen] = useState(true);

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          isChannelListOpen={isChannelListOpen}
          setIsChannelListOpen={setIsChannelListOpen}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
          isChannelListOpen={isChannelListOpen}
        />
      </Chat>
    </div>
  );
}

export default App;
