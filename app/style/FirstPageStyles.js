import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    linearGradient: {
        flex: 1,
        justifyContent: 'center',
    },
    logoFirstPage: {
        alignItems: 'center',
    },
    logoFirstPageImg: {
        width: 200,
        height: 200,
    },
    loginView: {
        marginHorizontal: 40,
        marginTop: 150,
    },
    scroll: {
        marginTop: 50
    },
    grainBrain: {
        marginTop: -50,
        fontSize: 18,
        color: "white"
    },
    tm: {
        fontSize: 12,
        color: "white"
    },
    guest: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        marginTop: 15
    },
    guestText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        marginTop: 15,
        marginLeft:10
    },

    footerText: {
        fontSize: 13,
        color: "white",
        textAlign: "center",
        marginHorizontal: 5
    },
    copyLinkText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    copyView: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "center",
        marginBottom:Platform.OS == 'ios' ? 40 : 10
    },
    copyLinkImage:{
        width: 14,
        height: 14,
        marginRight:5,
        marginVertical:5
    }
});

