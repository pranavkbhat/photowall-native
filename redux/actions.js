import {database} from '../database/config'

export const remove_post = 'remove_post'
export const add_post = 'add_post'
export const add_comment = 'add_comment'
export const load_comments = 'load_comments'
export const load_posts = 'load_posts'

//add to database
export function startAddingPost(post){
    return (dispatch) => {
        return database.ref('posts').update({ [post.id]: post }).then(() => {
        dispatch(addPost(post))
        }).catch((error) => {
            console.log(error)
        })
    }
}

//load from database
export function startLoadingPost(){
    return (dispatch) => {
        return database.ref('posts').once('value').then((snapshot) => {
            let posts = []
            snapshot.forEach((childSnapshot) => {
                posts.push(childSnapshot.val())
            })
            dispatch(loadPosts(posts))
        })
    }
}

//removing post from databse
export function startRemovingPost(index, id){
    const updates = {
        [`posts/${id}`]: null,
        [`comments/${id}`]: null
       }
    return (dispatch) => {
        return database.ref().update(updates).then(() => {
            dispatch(removePost(index))
        })
    }
}

//add comments to database
export function startAddingComment(comment, postId){
    return (dispatch) => {
        return database.ref('comments/'+postId).push(comment).then(() => {
            dispatch(addComment(comment, postId))
        })
    }
}

//load comments from database
export function startLoadingComments(){
    return (dispatch) => {
        return database.ref('comments').once('value').then((snapshot)=>{
            let comments = {}
            snapshot.forEach((childSnapshot) => {
                comments[childSnapshot.key] = Object.values(childSnapshot.val())
            })
            dispatch(loadComments(comments))
        })
    }
}

//load comments to UI
export function loadComments(comments){
    return{
        type: 'load_comments',
        comments
    }
}

//load posts to UI
export function loadPosts(posts){
    return{
        type: 'load_posts',
        posts
    }
}

export function removePost(id){
    return{
        type: 'remove_post',
        id
    }
}

export function addPost(title, imageLink, id){
    return{
        type: 'add_post',
        payload: {title: title, imageLink: imageLink, id: id}
    }
}

export function addComment(comment, postId){
    return{
        type: 'add_comment',
        comment: comment,
        postId
    }
}