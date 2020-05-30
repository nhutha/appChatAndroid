import React,{Component} from "react";
import {View,Text, Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons"
import Chat from "./chat";
import List from "./list";

const Tab = createBottomTabNavigator();
class Main extends Component{
    render(){
        return(
            <Tab.Navigator
                screenOptions = {({route}) => ({
                    tabBarIcon : ({focused, color, size}) =>{
                        let iconName;
                        if (route.name === 'Chat') {
                            iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
                          } else if (route.name === 'List') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                          }
              
                          // You can return any component that you like here!
                          return <Ionicons name={iconName} size={size} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: '#3EBA77',
                    inactiveTintColor: 'gray',
                  }}
            >
            <Tab.Screen name="List" component={List} />
            <Tab.Screen name="Chat" component={Chat} />
           
            </Tab.Navigator>
        )
    }
}

export default Main;