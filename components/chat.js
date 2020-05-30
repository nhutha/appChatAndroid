import React, {Component} from "react";
import {View, Text,AsyncStorage} from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import io from "socket.io-client/dist/socket.io.js";
class Chat extends Component{

    constructor(props){

        super(props);
        
        this.socket = io("http://192.168.1.4:3000");
        this.socket.on("receive-message",data=>{
            let data0 = {
                ...data.user,
                _id:5
            };
            let message = [{
                ...data,
                user : data0
            }]
            console.log("message nhan: ",message);
            this.setData(GiftedChat.append(this.state.messages, message));
            this.showData();
            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, message),
              }));
        })
        this.state = {
            messages: [
                // {
                //     _id :1,
                //     text : "123",
                //     user : {
                //         avatar : "http://207.148.71.252:7050/public/img/5ed0a4c64671331faa58b7a1_img0.jpg"
                //     }
                // }
            ],
        }
        
    }
    // http://207.148.71.252:7050/public/img/5ed0a4c64671331faa58b7a1_img0.jpg

    setData = async(data)=>{
        console.log("data store",data);
        await AsyncStorage.setItem("MESSAGE",JSON.stringify(data[0]));
    }
    componentDidMount(){
        const result = this.showData();
        console.log("123",result);
    }
    showData = async()=>{
        const result = await AsyncStorage.getItem("MESSAGE");
        return result;
    }
    onSend =async (messages = [])=> {
        console.log("message",messages);
        console.log("state",this.state)

        this.socket.emit("send-message",messages[0]);
        let message0 = messages[0];
        let data = [{...message0,user:{
            avatar: 'http://207.148.71.252:7050/public/img/5ecdda8bf9c27765ab96e828_img0.jpg',
          }}];
        console.log("data: ",data);
        this.setData(GiftedChat.append(this.state.messages, data));
        this.showData();
        this.setState( (previousState) => ({
            messages: GiftedChat.append(previousState.messages, data),
        }));
      }

    render(){

        return(
            <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user = {{
                avatar : 'http://207.148.71.252:7050/public/img/5ed0a4c64671331faa58b7a1_img0.jpg'
            }}
          />
        )
    }
}

export default Chat;