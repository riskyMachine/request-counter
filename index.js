const express = require('express');
const app = express();
app.use(express.json());
const child = require('child_process');
const { interval } = require('./config.json') 
let cacheObj = {signup:{totalEvents:0, eventsByIds:{}}};
const redis = require('redis');

const redis_port = 6379;
const client = redis.createClient(redis_port);
client.on("error", function(error) {
    console.error('redis_error: ',error);
});

app.post('/visitors/event',(req,res) => {
    const { trackingId, event } = req.body
    if(req.body.event === 'formsubmit'){
        cacheObj.signup.totalEvents++
        if(!cacheObj.signup.eventsByIds[trackingId]){
            cacheObj.signup.eventsByIds[trackingId] = 1;
        }else{
            cacheObj.signup.eventsByIds[trackingId]++
        }
    }
    else{
        if(!cacheObj[event]){
            cacheObj[event] = {totalEvents: 1, eventsByIds: {}}
            cacheObj[event].eventsByIds[trackingId] = 1;
        }else{
            cacheObj[event].totalEvents++
            if(!cacheObj[event].eventsByIds[trackingId]){
                cacheObj[event].eventsByIds[trackingId] = 1
            }else{
                cacheObj[event].eventsByIds[trackingId]++
            }
        }
    }
});

let counter = 0;
setInterval(() => {
    console.log('After Interval: ', cacheObj);
    client.set('cacheObj_'+counter, JSON.stringify(cacheObj));
    cacheObj = {signup:{totalEvents:0, eventsByIds:{}}};
    counter++;
    client.get('cacheObj_'+(counter-1),redis.print)
}, interval*60*1000);

app.listen(3000)

child.fork('client-side');