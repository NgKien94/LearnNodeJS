//[GET] /chat/
module.exports.index = (req, res) => {
    //Socket io
    _io.on('connection',(socket) =>{
        console.log('A user connected ',socket.id)
      })
    //End Socket io

    res.render('client/pages/chat/index', {
        pageTitle: 'Chat'
    })
}