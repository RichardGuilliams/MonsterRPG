const catchAsync = require('./utils/catchAsync')

module.exports.connect = catchAsync(async (io) => {
    io.on('connection', async (socket) => {
        socket.on('connect', async (socket) => {
            receiveConnect(io, 'receive-connect', {
                socket
            });
            // io.emit('receive-connect', {
            //     socket: socket.id,
            //     message: `socket: ${socket.id} has connected..`
            // });
        });
    });
});

const receiveConnect = async function(io, eventName, event){
    io.emit(eventName, event);
}


