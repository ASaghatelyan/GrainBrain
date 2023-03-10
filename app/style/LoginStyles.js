import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    LoginView: {
        marginHorizontal: 20,
        marginBottom: 48,
    },
    forgotPasswordView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: -6,
        marginRight: 7,
    },
    checkBoxView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    lineView: {
        borderWidth: 3,
        borderRadius: 38,
        width: 59,
        borderColor: 'white',
    },
    newAccount: {
        color: 'white',
        fontFamily: 'OpenSans-Regular',
    },
    signUpText: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'OpenSans-Regular',
    },
    forgotText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'OpenSans-Regular',
    },
    validateText:{
        textAlign:"left",
        color:"#FF2E00",
        fontSize:12,
        marginVertical:1
    }
});

