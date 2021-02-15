import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, FlatList, Keyboard} from 'react-native'
import {Card, Button} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'

export default function Single( {route} ) {
    
    const comments = useSelector(state => state.commentReducer)
    const [comment, setComment] = useState('')
    const paramid = route.params?.id
    const dispatch = useDispatch() 

    // console.log(comments)
    // console.log(route.params?.id)
    
    const submitHandler = () => {
        dispatch({
            type: 'add_comment',
            comment: comment,
            postId: route.params?.id
        })
        setComment('')
        Keyboard.dismiss() 
    }

    const keyedcomments = comments[paramid]?comments[paramid].map((comment, id) => {
        return {
            key : id.toString(),
            comment: comment
        }
    }):[]
    // console.log(keyedcomments)

    return(
    <View> 
        <Card.Cover
            source={{uri : route.params?.imageLink}}
        />
        <Text style={{margin: 10, fontFamily: 'nunito-bold', fontSize: 20}} >{route.params?.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', paddingHorizontal: 0}}>            
            <TextInput 
                multiline
                placeholder='Comment' 
                style={styles.input}
                value={comment}
                onChangeText={setComment}
            />
            <Button
                icon='send'
                style={{ position: 'absolute'}}
                color= '#6a43bf'
                onPress={submitHandler}
            />     
        </View>
        <View>
            <FlatList 
                data={keyedcomments}
                style={{height: 250}}
                renderItem={({item}) =>(
                    <Text style={styles.commented} key={item.key.toString()}>{item.comment}</Text>
                )}
            />
        </View>
    </View>)
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'nunito-regular',
        fontSize: 15,
        marginBottom: 10,
        paddingHorizontal: 140,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    commented: {
        fontFamily: 'nunito-regular',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginHorizontal: 15
    }
})