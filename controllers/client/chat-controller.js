const Chat = require('../../models/chat-model')
const User = require('../../models/user-model')
const uploadCloudToCloudinary = require('../../helpers/uploadCloudinary');

const chatSocket = require('../../sockets/client/chat-socket')
//[GET] /chat/
module.exports.index =  async (req, res) => {

    //Socket io
    chatSocket(res);
    //End Socket io
    
    // Lấy ra data
    const chats = await Chat.find({
        deleted: false
    })

    for( const chat of  chats){
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");
        chat.infoUser = infoUser
    }
    console.log(chats)

    res.render('client/pages/chat/index', {
        pageTitle: 'Chat',
        chats: chats
    })
}