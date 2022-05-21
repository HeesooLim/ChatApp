import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import './ChannelSearch.scss'

const ChannelSearch = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const onSearch = (e) => {
        e.preventDefault();

        const getChannels = async (text) => {
            try {
                // TODO: fetch channels
            } catch (err) {
                setQuery('');
            }
        }

        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }

    return (
        <div>
            <div className="channel-search__container">
                <div className="channel-search__input__wrapper">
                    <div className="channel-search__input__icon">
                        {/* <SearchIcon /> */}
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
        </div>
    )
}

export default ChannelSearch