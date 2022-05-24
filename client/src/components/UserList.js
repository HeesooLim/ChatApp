import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import './UserList.scss'

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        setSelected((prevSelected) => !prevSelected);
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id));
        }
        else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
        }
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__avatar">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
            </div>
            {user.fullName}
            <div className='user-item__checkmark'>
                {selected ? <FontAwesomeIcon icon={solid('check')} color="green" /> : ""}
            </div>

        </div>
    )
}

const UserList = ({ setSelectedUsers, setChannelName }) => {
    const { client } = useChatContext();
    const [err, setErr] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID }, role: 'user' },
                    { id: 1 },
                    { limit: 7 }
                );
                if (response.users.length) {
                    setUsers(response.users);
                    console.log(response.users);
                }
                else {
                    setListEmpty(true);
                }
            } catch (err) {
                setErr(true);
            }
            setLoading(false);
        }

        if (client) getUsers();
    }, [])

    if (err) {
        return (
            <ListContainer>
                <div className="user-lit__message">Error. Please try again.</div>
            </ListContainer>
        );
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <div className="user-lit__message">No user found.</div>
            </ListContainer>
        );
    }

    return (
        <ListContainer>
            {loading
                ? <div className="user-lit__message">Loading users</div>
                : (users?.map((user, i) => {
                    return (<UserItem setChannelName={setChannelName} setSelectedUsers={setSelectedUsers} index={i} key={user.id} user={user} />)
                }
                ))
            }
        </ListContainer>
    )
}

export default UserList;