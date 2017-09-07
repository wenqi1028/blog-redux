import { LOGIN, 
    UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, 
    LOAD_USER, UPDATE_USER } from '../actions'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return action.data;
        }
        case LOAD_USER: {
            return {
                ...action.data,
            }
        }
        case UPLOAD_AVATAR: {
            return {
                ...state,
                loading: true,
            }
        }
        case UPLOAD_AVATAR_SUCCESS: {
            return {
                ...state,
                loading: false,
                avatar: action.data.file_path
            }
        }
        case UPDATE_USER: {
            localStorage.nickname = action.data.nickname
            localStorage.avatar = action.data.avatar
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            return state
    } 
}