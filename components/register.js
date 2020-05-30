import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import register from '../../api/register';
import axios from "axios";
export default class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: ''
        };
    }
    onRegister = () => {
        const { name, email, password, rePassword } = this.state;

        if (name.length === 0 || email.length === 0 || password.length === 0 || rePassword.length === 0) {
            Alert.alert(
                'Notice',
                'Phải nhập đầy đủ thông tin',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        } else if (password !== rePassword) {
            Alert.alert(
                'Notice',
                'Mật khẩu không giống nhau ',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        } else {
            axios("http://192.168.1.4:3000/api/user/register", {
                data: {
                    email,
                    password,
                    fullName: name
                },
                method: "POST"
            })
                .then(async res => {
                    Alert.alert(
                        'Notice',
                        `Bạn đã đăng ký thành công tài khoản ${email}`,
                        [
                            { text: 'OK', onPress: () => { this.props.goToLogin(email) } }
                        ],
                        { cancelable: false }
                    );

                }).catch(err => {
                    console.log(err)
                    Alert.alert("Notice", "Bạn đã đăng ký thất bại");
                })
        }




    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your name"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your password"
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Re-enter your password"
                    value={this.state.rePassword}
                    secureTextEntry
                    onChangeText={text => this.setState({ rePassword: text })}
                />
                <TouchableOpacity style={bigButton} onPress={this.onRegister} >
                    <Text style={buttonText}>SIGN UP NOW</Text>
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
