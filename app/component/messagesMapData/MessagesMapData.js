import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {MessagesContext} from '../../screen/tabScreen/Messages';
import {SwipeListView} from 'react-native-swipe-list-view';


export default function MessagesMapData(propsBig) {

    const MessagesProps = useContext(MessagesContext);
    const dataFunc = (props) => {
        return (
            <TouchableOpacity style={{backgroundColor: 'rgb(250, 250, 250)',marginTop:5,}} onPress={() => {
                MessagesProps.navigation.navigate('chat', {yourID: props.item.id, name: props.item.name});
            }}>
                <View style={styles.view_container}>
                <View style={styles.messMapView}>
                    <Image
                        source={{uri: props.item.image}}
                        style={styles.eclImg}
                    />
                    <View style={styles.messageProfileText}>
                        <Text style={styles.nameText}>{props.item.name}</Text>
                        <View style={styles.youView}>
                            <Text style={styles.you}>YOU:</Text>
                            <Text style={styles.description} numberOfLines={1}> {props.item.message}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.activeView}>
                    {props?.item?.new_message_count ?
                      <Text style={styles.messagesActive}>{props.item.new_message_count}</Text>
                      :null
                    }
                </View>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        )
    }

    return (
        <SwipeListView
            data={propsBig.data}
            renderItem={dataFunc}
            renderHiddenItem={(data, rowMap) => (
                <TouchableOpacity onPress={() => propsBig.deleteFunc(data.item.id)} style={styles.rowBack}>
                    <View style={styles.viewDelete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </View>
                </TouchableOpacity>
            )}
            rightOpenValue={-75}
        />
    );
}

const styles = StyleSheet.create({
    messMapView: {
        flexDirection: 'row',
        marginHorizontal: 41,
    },
    eclImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginVertical:8
    },
    view_container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    activeView: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    messagesActive: {
        backgroundColor:'red',
        paddingVertical:2,
        paddingHorizontal:8,
        borderRadius:100,
        fontWeight:'bold',
        color:'white',
        fontSize:15
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        PaddingVertical: 16,
    },
    nameText: {
        color: '#136A8A',
        fontWeight: 'bold',
        marginBottom: 12,
        fontSize: 15
    },
    youView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    you: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
    description: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        maxWidth: 280
    },
    messageProfileText: {
        justifyContent: 'center',
        marginLeft: 12,
    },
    deleteText: {
        color: 'white',
        fontSize: 16,
        marginRight: 13,
    },
    rowBack: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop:5,
    },
    viewDelete:{
        width:75,alignItems:'center',justifyContent:'center',backgroundColor:'red',flex:1,
    }
});
