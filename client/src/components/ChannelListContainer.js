import React from "react"
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

const SideBar = ({ logout }) => (
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
    </div>
)

export const Header = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">My Channels</p>
    </div>
)

const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    const logout = () => {
        cookies.remove('id');
        cookies.remove('name');
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload();
    }

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <Header />
                <ChannelSearch />
                <ChannelList
                    // filters the messages
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <GroupChannelList
                            {...listProps}
                            type="group"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <GroupChannelPreview
                            {...previewProps}
                            type="group"
                        />
                    )}
                />
                <ChannelList
                    // filters the messages
                    filters={{}}
                    channelRenderFilterFn={() => { }}
                    List={(listProps) => (
                        <GroupChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <GroupChannelPreview
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}

export default ChannelListContainer;