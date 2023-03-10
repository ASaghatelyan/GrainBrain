const firebaseState = {

};

const firebaseToken = (state = firebaseState, action) => {
    switch (action.type) {
        case 'FIREBASE_TOKEN':
            return {
                firebase:action.payload,
            };
        default:
            break;
    }
    return state;
};

export default firebaseToken;
