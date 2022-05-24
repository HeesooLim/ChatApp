import React, { useState } from "react"
import { ChannelList, useChatContext } from "stream-chat-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

// import Cookies from "universal-cookies";

import { ChannelSearch, GroupChannelPreview, GroupChannelList } from "./";
import Icon from "../assets/icon.png";
import Logout from "../assets/logout.png";
import './ChannelListContainer.scss'
import Cookies from "universal-cookie";
// import GroupChannelList from "./GroupChannelList";

const cookies = new Cookies();

const SideBar = ({ logout, setIsChannelListOpen }) => {

    const handleClick = () => {
        setIsChannelListOpen((prevVal) => !prevVal)
    }

    return (
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1 channel-list-icon">
                <div className="icon1__inner">
                    <FontAwesomeIcon icon={solid('message')} size="2x" color="white" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2 channel-list-icon">
                <div className="icon1__inner" onClick={logout}>
                    <FontAwesomeIcon icon={solid("arrow-right-from-bracket")} size="2x" color="white" />
                    {/* <img src={Logout} alt="Logout" width={30} /> */}
                </div>
            </div>
            <div className="channel-list__sidebar__icon3 channel-list-icon">
                <div className="icon1__inner" onClick={handleClick}>
                    T
                    {/* <img src={Logout} alt="Logout" width={30} /> */}
                </div>
            </div>
        </div>
    )
}

export const Header = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">My Channels</p>
    </div>
)

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, isChannelListOpen, setIsChannelListOpen, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove('userId');
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload();
    }

    const team_filters = { type: 'team', members: { $in: [client.userID] } }
    const messaging_filters = { type: 'messaging', members: { $in: [client.userID] } }

    const customChannelTeamFilter = (channels) => {
        return channels.filter((channel) => channel.type === 'team');
    }

    const customChannelMessagingFilter = (channels) => {
        return channels.filter((channel) => channel.type === 'messaging');
    }

    return (
        <>
            <SideBar logout={logout} setIsChannelListOpen={setIsChannelListOpen} />
            <div className="channel-list__list__wrapper" style={{ display: isChannelListOpen ? 'block' : 'none' }}>
                <Header />
                <ChannelSearch  setToggleContainer={setToggleContainer} />
                <ChannelList
                    // filters the messages
                    filters={team_filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <GroupChannelList
                            {...listProps}
                            type="group"
                            isCreating={isCreating}
                            setCreateType={setCreateType}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )
                    }
                    Preview={(previewProps) => {
                        console.log(previewProps)
                        return (

                            <GroupChannelPreview
                                {...previewProps}
                                setToggleContainer={setToggleContainer}
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                type="group"
                            />
                        )
                    }}
                />

                <ChannelList
                    // filters the messages
                    filters={messaging_filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <GroupChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setCreateType={setCreateType}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <GroupChannelPreview
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, isChannelListOpen, setIsChannelListOpen }) => {
    const [toggleContainer, setToggleContainer] = useState(false);


    return (
        <>
            {/* <div className={"channel-list__container" + (isChannelListOpen ? " list-open" : "")}>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    isChannelListOpen={isChannelListOpen}
                    setIsChannelListOpen={setIsChannelListOpen}
                    setToggleContainer={setToggleContainer}
                />
            </div> */}
            <div className={"channel-list__container" + (isChannelListOpen ? " list-open" : "")}>
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    isChannelListOpen={isChannelListOpen}
                    setIsChannelListOpen={setIsChannelListOpen}
                    setToggleContainer={setToggleContainer}
                />
            </div>


            {/* <div className="channel-list__container-responsive">
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}></div>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div> */}
        </>
    )
}

export default ChannelListContainer;