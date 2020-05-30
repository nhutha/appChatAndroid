import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet,Alert, AsyncStorage } from 'react-native';



import axios from "axios";




export default class Login extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            email: 'nhuthahuu@gmail.com',
            password: '123456'
        };
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps && nextProps.email){
    //         this.setState({
    //             email : nextProps.email
    //         })
    //     }
    // }

    goToMain =async (res)=>{
        const {navigation} = this.props;
        try{
            await AsyncStorage.setItem("TOKEN",res.data.token);
            navigation.navigate("Main");
        }catch(e){
            console.log(e);
        }
    }

    onLogin = async()=>{
        const {email,password} = this.state;
        axios("http://192.168.1.4:3000/api/user/login",{
            data : {
                email,
                password
            },
            method : "POST"
        })
        .then(async res=>{
            Alert.alert(
                'Notice',
                'Bạn đã đăng nhập thành công',
                [
                    { text: 'OK', onPress :()=> {this.goToMain(res)}}
                ],
                { cancelable: false }
            );
        
        }).catch(err=>{
            console.log(err)
            Alert.alert("LOGIN FAIL","Bạn đã đăng nhập thất bại");
        })
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const { email, password } = this.state;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={bigButton} onPress={this.onLogin} >
                    <Text style={buttonText}>SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '400'
    }
});
