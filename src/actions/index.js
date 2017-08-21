import { target } from '../utils'

export const LOGIN = 'LOGIN' 
export const CREATE_ARTICLE = 'CREATE_ARTICLE' 
export const CLEAR_ARTICLE = 'CLEAR_ARTICLE' 
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE' 
export const CHANGE_CONTENT = 'CHANGE_CONTENT'
export const SEARCH_ARTICLE = 'SEARCH_ARTICLE' 
export const LOAD_USER = 'LOAD_USER' 
export const UPLOAD_AVATAR = 'UPLOAD_AVATAR'
export const UPDATE_USER = 'UPDATE_USER' 
export const LOAD_ARTICLE = 'LOAD_ARTICLE' 
export const LOAD_ARTICLES = 'LOAD_ARTICLES' 
export const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS'
export const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR'
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH'
export const CHANGE_TAG = 'CHANGE_TAG'
export const API_URL = target + 'api/'

export function loading() {
    return function(dispatch) {
        dispatch({
            type: LOADING,
        })
    }
}

export function fetchPosts(tag = '') {
    return function(dispatch) {
	    fetch(API_URL + 'archives?tag=' + tag)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: LOAD_ARTICLES,
                data
		    });
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function fetchPost(id) {
    return function(dispatch) {
	    fetch(API_URL + 'detail?postid=' + id)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: LOAD_ARTICLE,
                data
            })
            
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function clearPost() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ARTICLE,
        })
    };
}

export function fetchUser(uid) {
    return function(dispatch) {
        dispatch({
            type: LOAD_USER,
            data: localStorage
        })
    }
}

export function createPost(props) {
    return function(dispatch) {
	    fetch(API_URL + 'create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: `uid=${props.uid}&post_title=${encodeURIComponent(props.post_title)}&post_desc=${encodeURIComponent(props.post_desc)}&post_content=${encodeURIComponent(props.post_content)}&tags=${encodeURIComponent(props.tags)}`
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: CREATE_ARTICLE,
                data
            })
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function updatePost(props) {
    return function(dispatch) {
	    fetch(API_URL + 'update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:  `post_id=${props._id}&post_title=${encodeURIComponent(props.post_title)}&post_desc=${encodeURIComponent(props.post_desc)}&post_content=${encodeURIComponent(props.post_content)}&tags=${encodeURIComponent(props.tags)}`
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: UPDATE_ARTICLE,
                data
            })
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function deletePost(postid) {
    return function(dispatch) {
	    fetch(API_URL + 'delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:  `postid=${postid}`
        })
        .then(function(response) {
            return response.json()
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function updateUser(props) {
    return function(dispatch) {
	    fetch(API_URL + 'user/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: `uid=${props.uid}&nickname=${props.nickname}&avatar=${props.avatar}`
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: UPDATE_USER,
                data
            })
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function uploadavatar(file) {
    const formData = new FormData()
    formData.append('file', file)
    return function(dispatch) {
	    fetch(API_URL + '../upload', {
            method: 'POST',
            headers: { 'X-File-Name': encodeURIComponent(file.name) },
            body: formData
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log('data', data)
            dispatch({
                type: UPLOAD_AVATAR,
                data
            })
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function login(props) {
    return function(dispatch) {
	    fetch(API_URL + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `username=${props.username}&password=${props.password}`
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: LOGIN,
                data
            })
        })
        .catch(function(e) {
            console.error(e)
        });
    };
}

export function fetchSearch(keyword) {
    return function(dispatch) {
        fetch(API_URL + 'search?k=' + keyword)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            dispatch({
                type: SEARCH_ARTICLE,
                data
            })
        })
        .catch(function(e) {
            console.error(e)
        })
        
    }
}

export const toggleSearch = (isFocus) => (dispatch) => {
    dispatch({
        type: TOGGLE_SEARCH,
        data: {isFocus}
    })
}
