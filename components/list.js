import React, {Component} from "react";
import {View, Text, FlatList, AsyncStorage, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons"
import axios from "axios";

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : []
        }
    }

    getListUser = async()=>{
        const token = await AsyncStorage.getItem("TOKEN");
        
        axios("http://192.168.1.4:3000/api/user", {
                headers: {
                    Authorization : token
                },
                method: "GET"
            })
            .then( res => {
                this.setState({
                    dataSource : res.data.listUser
                })
            }).catch(err => {
                console.log("err",err);
            })
    }

    componentDidMount(){

        this.getListUser();
    }
    startChat = ()=>{
        const {navigation} = this.props;
        navigation.navigate("Chat");
    }
    render(){
        
        return(
            <View style ={{flex : 1, backgroundColor:"white"}}>
                <Text style={{textAlign:"center",
                                fontSize:30}}>Danh Sách Người Đã Đăng Ký</Text>
               <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => <TouchableOpacity onPress ={this.startChat}>
                    <View style={{backgroundColor: '#3EBA77',
                                                        padding: 20,
                                                        marginVertical: 8,
                                                        marginHorizontal: 16,
                                                        flexDirection: "row",
                                                        justifyContent : "space-between",
                                                        alignItems:"center"}}>
                                            <Ionicons name='ios-contact' size={30} color={"white"} />
                                            <View style={{ flexDirection: "column",justifyContent : "center",
                                                        alignItems:"center"}}>
                                                <Text style={{fontSize: 32,color:"white"
                                                            }}>{item.email}
                                                </Text>
                                                <Text style={{fontSize: 32,color:"white"
                                                            }}>Tên: {item.fullName}</Text>

                                            </View>
                                        </View>
                </TouchableOpacity>
            }
                keyExtractor={item => item.id}
            />
            </View>
        )
    }
}

export default List;