import React from 'react';
import {View, Image, StatusBar,Text,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../style/FirstPageStyles';
import Button from '../../component/button/Button';
import {ScrollView} from "react-native-gesture-handler";

export default function FirstPage(props) {

    return (
        <LinearGradient
            colors={['#136A8A', '#267871C2']}
            style={styles.linearGradient}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <StatusBar backgroundColor={'#136A8A'} barStyle={'light-content'}/>
                <View style={styles.logoFirstPage}>
                    <Image source={require('../../assets/image/GrainBrainlogo.png')} style={styles.logoFirstPageImg}/>
                    <Text style={styles.grainBrain}>GRAINBRAIN<Text style={styles.tm}>TM</Text></Text>
                </View>
                <View style={styles.loginView}>
                    <Button
                        title={'LOG IN'}
                        backgraund={'white'}
                        backgroundColor={'white'}
                        color={'#136A8A'}
                        fontWeight={'bold'}
                        onPress={() => {
                            props.navigation.navigate('login');
                        }}/>
                    <Button
                        title={'SIGN UP'}
                        color={'#FFFFFF'}
                        borderColor={'white'}
                        borderWidth={1}
                        marginTop={15}
                        fontWeight={'bold'}
                        onPress={() => {
                            props.navigation.navigate('signUp');
                        }}/>
                        {/*<View style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}}>*/}
                        {/*    <Text style={styles.guest}>Continue as</Text>*/}
                        {/*    <TouchableOpacity onPress={() =>{*/}
                        {/*        props.navigation.navigate("guest")*/}
                        {/*    }}>*/}
                        {/*        <Text style={styles.guestText}>Guest</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}
                </View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Anonymous')}>
                    <Text style={[styles.copyLinkText,{fontWeight:'bold',marginTop:20}]}>Post Anonymous </Text>
                </TouchableOpacity>
            </ScrollView>
            <Text style={styles.footerText}>The opinions, advice and information shared and provided on this app are not the responsibility of GrainBrain, its owners or employees</Text>
            <View style={styles.copyView}>
                <Image source={require("../../assets/image/copyRight.png")} style={styles.copyLinkImage}/>
                <Text style={styles.copyLinkText}>GRAINBRAIN 2021</Text>
            </View>
        </LinearGradient>
    );
}
