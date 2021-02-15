import POSTS from '../data/posts'
import {combineReducers} from 'redux'
import  { remove_post, add_post, add_comment, load_comments, load_posts } from './actions'

function postReducer(state = POSTS, action){
    switch(action.type){
        case remove_post: return state.filter((post)=> post.id !== action.payload.id)
        case add_post: return [action.payload, ...state ]
        case load_posts: return action.postReducer
        default: return state;
    }
}

function commentReducer(state={}, action){
    // console.log(state)
    switch(action.type){
        case add_comment: 
        if(!state[action.postId]){
            return{[action.postId]: [action.comment], ...state}
            
        } else {
            return{ ...state, [action.postId]: [action.comment, ...state[action.postId]]}
        }
        case load_comments: return action.commentReducer
        default : return state
    }
}

const rootReducer = combineReducers({postReducer,commentReducer})

export default rootReducer