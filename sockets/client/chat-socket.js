const Chat = require('../../models/chat-model')
const User = require('../../models/user-model')
const uploadCloudToCloudinary = require('../../helpers/uploadCloudinary');

module.exports = async (res) =>{

    const userId = res.locals.user.id 
    const fullName = res.locals.user.fullName


    _io.once('connection',(socket) =>{
            socket.on("CLIENT_SEND_MESSAGE", async (data)=>{
              
                let images = []
                for(const imageBuffer of data.images){
                    const link = await uploadCloudToCloudinary(imageBuffer);
                    images.push(link)
                }
    
                const chat = new Chat({
                    user_id: userId,
                    content: data.content,
                    images: images
                });
    
                await chat.save()
    
                // Trả data về client
                _io.emit("SERVER_RETURN_MESSAGE",{
                    userId : userId,
                    fullName: fullName,
                    content: data.content,
                    images: images
                });
                
            });
    
            socket.on("CLIENT_SEND_TYPING",(type)=>{
                socket.broadcast.emit('SERVER_RETURN_TYPING',{
                    userId : userId,
                    fullName: fullName,
                    type: type
                });
    
            });
    
          })
    
      
    
          // Dùng once để kết nối một lần duy nhất, không bị reload id sau mỗi lần load trang
}