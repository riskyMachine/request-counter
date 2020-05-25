const fetch = require('node-fetch')
const { eventRate } = require('./config.json')

const trackingIds = [
    "INF-yj562hjojzbtez",
    "INF-3gbfcjjsd6vhvo",
    "INF-ixpktk3itsk86",
    "INF-1bi5qk0zocqcz"
];
const created = [];
function sendReq(trackingId,event){
    fetch('http://localhost:3000/visitors/event',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trackingId: trackingId,
            event: event,
            timestamp: new Date()
        })
    }).catch(e => process.kill(process.pid));
}

function randomReq(){
    var random = Math.floor(Math.random() * created.length);
    sendReq(created[random],'click');
}

for(let i = 0; i<trackingIds.length; i++){
    const arrayEl = trackingIds[i]
    setTimeout(function(){
        sendReq(arrayEl,'formsubmit')
        created.push(arrayEl)
        if(created.length === 1){
            setInterval(randomReq,1000/eventRate);
        }
    },2*i*1000);
}
