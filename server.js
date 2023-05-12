const express=require('express');
const path = require('path');
const mqtt=require('mqtt');
const app=express();
const clinet=require('mqtt');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const client=mqtt.connect('mqtt://172.31.10.27:1883',{username:'1234',password:"1234"});
client.on('connect',()=>{
    console.log('connected to broker');
})
client.on('error',(err)=>{
    console.log(err);

})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));


});

app.post("/turn-on",(req,res)=>{
    
    const {message}=req.body;

    console.log(message);
    client.publish('mqtt/test',message, { qos: 1 },(err)=>{
        if (err) {
            console.error(error);
          } else {
            console.log(`published message: ${message}`);
          }
    });
    res.send("sent");

});
app.post("/turn-off",(req,res)=>{
    
    const {message}=req.body;

    console.log(message);
    client.publish('mqtt/test',message, { qos: 1 },(err)=>{
        if (err) {
            console.error(error);
          } else {
            console.log(`published message: ${message}`);
          }
    });
    res.send("sent");

});
app.listen(3000,()=>{
        console.log("server is running");
})