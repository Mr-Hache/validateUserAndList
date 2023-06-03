    import {
        CHANGE_AUTHENTICATION,
        CHANGE_USER
    } from './actions';

    const initialState = {
        isAuthenticated: false,
        user : {
            id: '',
            name: '',
            email: '',
            username: '',

        }
    }

    const reducer = (state = initialState, action) => {
        switch(action.type) {
            case CHANGE_AUTHENTICATION:
                return {
                    ...state,
                    isAuthenticated: action.payload
                }
            case CHANGE_USER:
                return {
                    ...state,
                    user: action.payload
                }
            default:
                return state;
        }
    }

    export default reducer;