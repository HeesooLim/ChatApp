import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { ResultsDropdown } from './'

import './ChannelSearch.scss'

const ChannelSearch = ({ setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [groupChannels, setGroupChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        if (!query) {
            setGroupChannels([]);
            setDirectChannels([]);
        }
    }, [query])

    const onSearch = (e) => {
        e.preventDefault();

        const getChannels = async (text) => {
            try {
                const channelResponse = client.queryChannels({
                    type: 'team',
                    name: { $autocomplete: text },
                    members: { $in: [client.userID] }
                });

                const userResponse = client.queryUsers({
                    id: { $ne: client.userID },
                    name: { $autocomplete: text }
                });

                const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

                if (channels.length) setGroupChannels(channels);
                if (users.length) setDirectChannels(users);
            } catch (err) {
                setQuery('');
            }
        }

        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }

    return (
        <div>
            <div className="channel-search__container">
                <div className="channel-search__input__wrapper">
                    <div className="channel-search__input__icon">
                    </div>
                    <input
                        className='channel-search__input__text'
                        placeholder='Search'
                        type='text'
                        value={query}
                        onChange={onSearch}
                    />
                </div>
            </div>
            {/* if query exists */}
            {query && (
                <ResultsDropdown
                    teamChannels={groupChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    )
}

export default ChannelSearch