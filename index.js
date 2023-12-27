// import express from "express";
// import { Server } from "socket.io";
// import http from 'http';
// import fs from "fs";
// import path from 'path';
// let __filename = new URL("" , import.meta.url).pathname.substring(1);
// let __dirname = path.dirname(__filename);

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIO(server);
const users = [];

app.use(express.static('public'));
app.get('/' , (req , res) => {
    res.sendFile(`${__dirname}/home.html`);
})




io.on('connection' , (socket) => {
    console.log("connected..");

    //add new user
    socket.on('new-user' , name => {
        users[socket.id] = name;
        socket.broadcast.emit('new-joiny' , name);
    })

    //send function
    socket.on('send' , message => {
        socket.broadcast.emit('receive' , {message , name:users[socket.id]})
    })

    // Handle disconnections
    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected' , {name:users[socket.id]})
    });
})













server.listen(port , (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Listening at port ${port}`);
    }
})