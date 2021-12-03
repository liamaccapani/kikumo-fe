import { SET_LOGGED_IN } from '../actions'
import { initialState } from '../store'

export const userReducer = (state = initialState.user, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case SET_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true
            }
        default: 
            return state
    }
}