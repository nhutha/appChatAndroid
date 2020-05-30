import React,{Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Authentication from "./components/authentication";
import Main from "./components/main";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

StatusBar.setHidden(true);
const Stack = createStackNavigator();
export default class App extends Component {
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen name="Authentication" component={Authentication}  options={{
          title: "Authentication",
          headerStyle : {
            backgroundColor : "#3EBA77"
          },
          headerTintColor : "white",
          headerTitleStyle : {
            fontWeight : "bold",
            textAlign : "center",
            fontSize : 30
          },
          
        }}/>
        <Stack.Screen name="Main" component={Main} options={{
          title: "My Chat App",
          headerStyle : {
            backgroundColor : "#3EBA77"
          },
          headerTintColor : "white",
          headerTitleStyle : {
            fontWeight : "bold",
            alignItems : "center",
            justifyContent : "center",
            fontSize : 30
          },
          
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}
