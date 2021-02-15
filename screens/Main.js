import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View} from 'react-native';
import { Badge, Button, Card, Title } from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux'
import { startLoadingComments, startLoadingPost } from '../redux/actions';

export default function Main( {navigation} ) {

    // useEffect(() => {
    //     startLoadingPost();
    //     startLoadingComments();
    // }, [])
    
    const posts = useSelector(state => state.postReducer)
    const comments = useSelector(state => state.commentReducer)
    const dispatch = useDispatch()

    return (
            <FlatList
                data={posts}
                renderItem={({item})=>(
                    <Card key={item.id} style={{flex:0, justifyContent: 'flex-start', marginHorizontal: 20, marginBottom: 20}}>
                        <Card.Content  >
                            <Title style={{fontFamily: 'nunito-bold'}}>{item.title}</Title>
                        </Card.Content>
                        <TouchableOpacity onPress={()=> navigation.navigate('single', item) }>
                            <Card.Cover source={{ uri: item.imageLink }} />
                        </TouchableOpacity>
                        <Card.Actions>
                            <Button color='red' onPress={() => dispatch({ type: 'remove_post', payload: item })} >Remove</Button>
                            <View>
                                <Button color='black' icon='comment' onPress={()=> navigation.navigate('single', item)}/>
                                <Badge style={{backgroundColor: '#6a43bf', position: 'absolute',top: 0, right: 20 }} size={17}>{comments[item.id] ? comments[item.id].length : 0}</Badge>
                            </View>
                        </Card.Actions>
                    </Card>
                )}
            />
    );
}

