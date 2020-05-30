import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Image } from 'react-native';
import Login from "./login";
import Register from "./register";
import Logo from "../assets/logo.png"
class Authentication extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSignIn : true,
      email : ''
    }
  }

  goToLogin = (email)=>{
    this.setState({
      isSignIn :true,
      email : email
    })
  }

  goToRegister = ()=>{
    this.setState({
      isSignIn: false
    })
  }

  render() {
    const {navigation} = this.props;
    const {
      row1, iconStyle, titleStyle,
      container, controlStyle,
      signInStyle, signUpStyle,
      activeStyle, inactiveStyle
  } = styles;
  const { isSignIn } = this.state;
  const mainJSX = isSignIn ? <Login email={this.state.email} navigation= {navigation} /> : <Register goToLogin={this.goToLogin} navigation = {navigation}/>
  return (
      <View style={container}>
        
          <View style={row1}>
           <Image source={Logo} style={{width:500,height:300}}/>
          </View>
          {mainJSX}
          <View style={controlStyle}>
              <TouchableOpacity style={signInStyle} onPress ={this.goToLogin} >
                  <Text style={isSignIn ? activeStyle : inactiveStyle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={signUpStyle} onPress = {this.goToRegister} >
                  <Text style={!isSignIn ? activeStyle : inactiveStyle}>SIGN UP</Text>
              </TouchableOpacity>
          </View>
      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3EBA77',
    padding: 20,
    justifyContent: 'space-between'
  },
  row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleStyle: { color: '#FFF', fontSize: 30 },
  iconStyle: { width: 30, height: 30 },
  controlStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  inactiveStyle: {
    color: '#D7D7D7'
  },
  activeStyle: {
    color: '#3EBA77'
  },
  signInStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 1
  },
  signUpStyle: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  },
})

export default Authentication;