import React from "react";
import {View, Text, StatusBar, StyleSheet, ScrollView, Image, TouchableOpacity, Platform} from "react-native"
import LinearGradient from 'react-native-linear-gradient';

export default function TermsAndConditions(props) {
    return (
        <LinearGradient
            colors={['#136A8A', '#267871C2']}
            style={styles.linearGradient}
        >
            <StatusBar backgroundColor={'#136A8A'} barStyle={'light-content'}/>
            <ScrollView>
                <TouchableOpacity style={styles.touch} onPress={()=>props.navigation.goBack()}>
                    <Text style={[styles.text,{fontSize: 20,textAlign:'left'}]}>Back</Text>
                </TouchableOpacity>
                <Text style={[styles.text,{fontSize: 20,fontWeight:'bold'}]}>Terms and Conditions</Text>
                <Text style={styles.text}>
                    1. Acknowledgement: GrainBrain and our End-User(s) acknowledge that the Grain Brain EULA is
                    concluded between GrainBrain and the End-User only, and not with Apple, and GrainBrain is solely
                    responsible for the Licensed Application and the content thereof. The EULA may not provide usage
                    rules for Licensed Applications that are in conflict with, the Apple Media Services Terms and
                    Conditions as of the Effective Date, which GrainBrain has reviewed and acknowledges.
                </Text>
                <Text style={styles.text}>
                    2. Scope of License: The license granted to GrainBrain End-User(s) must be limited to a
                    non-transferable license to use GrainBrain on any Apple-branded Products that the End-User owns or
                    controls and as permitted by the Usage Rules set forth in the Apple Media Services Terms and
                    Conditions, except that such Licensed Application may be accessed and used by other accounts
                    associated with the purchaser via Family Sharing or volume purchasing.
                </Text>
                <Text style={styles.text}>
                    3. Maintenance and Support: GrainBrain is solely responsible for providing any maintenance and
                    support services with respect to the Licensed Application, as specified in the EULA, or as required
                    under applicable law. GrainBrain and our End-User(s) must acknowledge that Apple has no obligation
                    whatsoever to furnish any maintenance and support services with respect to GrainBrain.
                </Text>
                <Text style={styles.text}>
                    4. Warranty: GrainBrain is solely responsible for any product warranties, whether express or implied
                    by law, to the extent not effectively disclaimed. The EULA provides that, in the event of any
                    failure of GrainBrain to conform to any applicable warranty, the End-User(s) may notify Apple, and
                    Apple will refund the purchase price if applicable for any costs associated with GrainBrain to that
                    End-User(s); and that, to the maximum extent permitted by applicable law, Apple will have no other
                    warranty obligation whatsoever with respect to GrainBrain, and any other claims, losses,
                    liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will
                    be Your sole responsibility.
                </Text>
                <Text style={styles.text}>
                    5. Product Claims: GrainBrain and our End-User(s) acknowledge that GrainBrain, not Apple, are
                    responsible for addressing any claims of the End-User(s) or any third party relating to GrainBrain
                    or the end- user’s possession and/or use of GrainBrain, including, but not limited to: (i) product
                    liability claims; (ii) any claim that the Licensed Application fails to conform to any applicable
                    legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or
                    similar legislation, including in connection with GrainBrain’s use of frameworks. The GrainBrain
                    EULA does not limit GrainBrain’s liability to the End-User(s) beyond what is permitted by applicable
                    law.
                </Text>
                <Text style={styles.text}>
                    6. Intellectual Property Rights: GrainBrain and our End-User (s) acknowledge that, in the event of
                    any third party claim that GrainBrain or our End-User’s possession and use of GrainBrain infringes
                    that third party’s intellectual property rights, GrainBrain, not Apple, will be solely responsible
                    for the investigation, defense, settlement and discharge of any such intellectual property
                    infringement claim.
                </Text>
                <Text style={styles.text}>
                    7. Legal Compliance: The End-User(s) must represent and warrant that (i) he/she is not located in a
                    country that is subject to a U.S. Government embargo, or that has been designated by the U.S.
                    Government as a “terrorist supporting” country, and (ii) he/she is not listed on any U.S. Government
                    list of prohibited or restricted parties.
                </Text>
                <Text style={styles.text}>
                    8. Developer Name and Address: GrainBrain states in our EULA the contact information (E-mail
                    address) to which any End-User questions, complaints, or claims with respect to GrainBrain can and
                    should be directed.
                </Text>
                <Text style={styles.text}>
                    9. Third Party Terms of Agreement: in GrainBrain’s EULA, the End-User(s) must comply with applicable
                    third-party terms of agreement when using GrainBrain, and must not be in violation of their wireless
                    data service agreement when using GrainBrain.
                </Text>
                <Text style={styles.text}>
                    10. Third-Party Beneficiary: GrainBrain and our End-User(s) acknowledge and agree that Apple, and
                    Apple’s subsidiaries, are third-party beneficiaries of the GrainBrain EULA, and that, upon the
                    End-User’s acceptance of the terms and conditions of the GrainBrain EULA, Apple will have the right
                    (and will be deemed to have accepted the right) to enforce the GrainBrain EULA against the
                    End-User(s) as a third party beneficiary thereof.
                </Text>
                <Text style={styles.text}>
                    11. Safety: GrainBrain End-User(s) must agree to terms (EULA) and these terms make it clear that
                    there is no tolerance for abusive users or abusive content on the Licensed Application. GrainBrain
                    will directly flag, filter, block, and/or remove abusive content through its content moderator(s).
                    End-User(s) violating the terms and conditions and/or identified as engaging in abusive behavior on
                    the Licensed Application will be blocked/removed from the Licensed Application. Any and all abusive
                    End User(S) and End User(s) content reported to GrainBrain or identified by its moderator(s) will be
                    removed within 24 hours and the End-User(s) can and will be subject to ejection from using the
                    Licensed Application indefinitely.
                </Text>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    text:{
        color: 'white',
        marginHorizontal:5,
        marginVertical:10,
        fontFamily: 'OpenSans-Regular',
        fontSize:15,
        textAlign:'center'
    },
    touch:{
        marginLeft:20,
        width:80,
        marginTop:Platform.OS === "ios"? 30 : 0
    }
})
