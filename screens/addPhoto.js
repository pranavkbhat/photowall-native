import React,{useState} from 'react'
import {View} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {useDispatch} from 'react-redux'

export default function addPhoto({navigation, route}) {

    const[title, setTitle] = useState('')
    const[imageLink, setImageLink] = useState('')
    const dispatch = useDispatch()
    const number = Number(new Date())

    return(
        <View style={{flex: 0, margin: 30, justifyContent: 'center'}}>
            <TextInput 
                label='Title'
                mode='outlined'
                style={{marginBottom: 10, height: 45}}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput 
                label='Link'
                mode='outlined'
                style={{marginBottom: 10, height: 45}}
                onChangeText={setImageLink}
                value={imageLink}
            />
            <View style={{marginTop: 15}}>
                <Button 
                    icon='image' 
                    mode='contained' 
                    color='#6a43bf'
                    contentStyle={{height: 45}} 
                    onPress={() => { 
                        dispatch({ 
                            type: 'add_post', 
                            payload: {
                                title: title,
                                imageLink: imageLink, 
                                id: `${number}` }})
                        navigation.navigate('Home');
                }}>
                Add Post
            </Button>        
            </View>      
        </View>  
    )
}