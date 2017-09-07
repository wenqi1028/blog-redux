import { 
    CLEAR_ARTICLE, 
    LOAD_ARTICLE, LOAD_ARTICLE_SUCCESS,
    LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, 
    CREATE_ARTICLE, CHANGE_CONTENT, SEARCH_ARTICLE, TOGGLE_SEARCH, CHANGE_TAG } from '../actions'

const initialState = {
    loading: true,
    error: false,
    articleList: [],
    searchList:[],
    isSearchActive: false,
    article: { _id: '', uid: '', post_title: '', post_desc: '', post_content: '', post_date: '1991-02-06T12:30:30.016Z', tags: '', update_date: '', user_docs: [] },
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_ARTICLE: {
            return {
                ...state,
                article: { uid: localStorage.uid, post_title: '', post_desc: '', post_content: '' },
            }
        }
        case LOAD_ARTICLE: {
            return {
                ...state,
                loading: true,
            }
        }
        case LOAD_ARTICLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                article: action.data[0],
            }
        }
        case LOAD_ARTICLES: {
            return {
                ...state,
                loading: true,
            }
        }
        case LOAD_ARTICLES_SUCCESS: {
            return {
                ...state,
                loading: false,
                articleList: action.data,
            }
        }
         case CREATE_ARTICLE: {
            return {
                ...state,
                loading: false,
                error: false,
                article: Object.assign(action.data,{user_docs: []}),
            }
        }
        case SEARCH_ARTICLE: {
            return {
                ...state,
                loading: false,
                error: false,
                searchList: action.data,
            }
        }
        case TOGGLE_SEARCH: {
            return {
                ...state,
                isSearchActive: action.data.isFocus ,
            }
        }
        case CHANGE_TAG: {
            console.log('changetag', action.data)
            return {
                ...state,
                article: { ...article, tags: action.data },
            }
        }
        default:
            return state
    } 
}