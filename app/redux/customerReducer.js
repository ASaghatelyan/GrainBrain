const customer = {

};

const customerReducer = (state = customer, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER':
            return {
                ...state,
                ...action.payload,
            };
        default:
            break;
    }
    return state;
};

export default customerReducer;
