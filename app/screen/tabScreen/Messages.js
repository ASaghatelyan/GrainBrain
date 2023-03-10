import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import InputBlue from '../../component/inputBlue/InputBlue';
import {styles} from '../../style/MessagesStyles';
import {MessagesDataFunc} from '../../component/data/Data';
import axiosInstance from "../../networking/axiosinstance";
import Loading from "../../component/loading/Loading";
import Axiosinstance from "../../networking/axiosinstance";

export const MessagesContext = React.createContext();

export default function Messages(props) {
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [state, setState] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            handle()
        });
        return unsubscribe;
    }, [props.navigation]);

    const deleteFunc = async (id) => {
        try {
            const response = await Axiosinstance.delete(`/deleteMessage/${id}`)
            let arr = data
            const arrFilter = arr.filter((item, i) => item.id !== id)
            setData([...arrFilter])
        } catch (e) {
            console.log(e)
        }
    }

    const handle = async () => {
        setVisible(true)
        try {
            const response = await axiosInstance.get("/getChatListUsers")
            setData(response.data.data)
            setVisible(false)
        } catch (e) {
            setVisible(false)
            console.log(e)
        }
    }

    const search = (text) => {
        setTimeout(async () => {
            if (text) {
                try {
                    setState(true)
                    const data = {username: text}
                    const response = await axiosInstance.post(`/searchByUserInMessage`, data)
                    console.log(response);
                    setSearchData(response.data.message)
                } catch (e) {
                    console.log(e.message)
                }
            } else if (!text) {
                setState(false)
            } else {
                setState(false)
            }
        }, 100)
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar backgroundColor={"rgb(250, 250, 250)"} barStyle={"dark-content"}/>
            <InputBlue handle={search}/>
            <View style={{flex:1,}}>
                <Text style={styles.messagesText}>MESSAGES</Text>
                <MessagesContext.Provider value={props}>
                    {
                        state ?
                            <ScrollView>
                                <MessagesDataFunc data={searchData} search={'search'}/>
                            </ScrollView>
                            :
                            <MessagesDataFunc data={data} deleteFunc={deleteFunc}/>
                    }
                </MessagesContext.Provider>
            </View>
            <Loading loading={visible}/>
        </View>
    );
}
