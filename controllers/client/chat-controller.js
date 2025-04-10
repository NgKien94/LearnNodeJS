const Chat = require('../../models/chat-model')
const User = require('../../models/user-model')

//[GET] /chat/
module.exports.index =  async (req, res) => {

    const userId = res.locals.user.id 

    //Socket io
    _io.once('connection',(socket) =>{
        socket.on("CLIENT_SEND_MESSAGE", async (content)=>{

            const chat = new Chat({
                user_id: userId,
                content: content
            });

            await chat.save()
        })
      })

      // Dùng once để kết nối một lần duy nhất, không bị reload id sau mỗi lần load trang
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