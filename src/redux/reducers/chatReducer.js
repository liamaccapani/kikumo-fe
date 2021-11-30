import { initialState } from '../store'

export const chatReducer = (state = initialState.chats, action) => {
    const { type, payload } = action;
    switch (action.type) {
        default: 
            return state
    }
}