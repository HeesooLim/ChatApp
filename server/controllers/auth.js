const bcrypt = require('bcrypt');
const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if (!users.length) return res.status(400).json({message: 'User not found'});

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            res.status(200).json({token, fullname: users[0].fullName, username, userId: users[0].id});
        }
        else {
            res.status(500).json({ message: 'Incorrect password' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

const register = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        console.log(fullName)
        console.log(username)
        console.log(password)
        console.log(phoneNumber)

        //  random sequence of 16 hexadecimal characters
        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        // 10: level of encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

module.exports = { login, register };