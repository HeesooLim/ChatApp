import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import './GroupChannelList.scss'
// import { AddChannel } from '../assets';

const GroupChannelList = ({ children, err = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {

    console.log(children)
    if (err) {
        return type === 'group' ? (
            <div className="group-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please waitt a moment and try again.
                </p>
            </div>
        ) : null;
    }

    if (loading) {
        <div className="group-channel-list">
            <p className="team-channel-list__message loading">
                <FontAwesomeIcon icon={solid('spinner')} spin size="4x" />

                {type === 'group' ? 'Channels' : 'Messages'} loading...
            </p>
        </div>
    }

    return (
        <div className='group-channel-list'>
            <div className="group-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'group' ? 'Channels' : 'Direct Messages'}
                    <button className="team-channel-list__add-button"
                        onClick={() => {
                            setCreateType(type === 'group' ? 'group' : 'messaging');
                            setIsCreating((prevState) => !prevState);
                            setIsEditing(false);
                            if (setToggleContainer) setToggleContainer((prevState) => !prevState);
                        }}
                    >
                        <FontAwesomeIcon icon={solid('circle-plus')} />
                    </button>
                </p>
            </div>
            <div className='group-channel-list__content'>
                {children}
            </div>


        </div>
    )
}

export default GroupChannelList;