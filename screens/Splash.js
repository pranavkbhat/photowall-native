import React from 'react'
import { View, Text } from 'react-native'

function Splash() {
    return (
        <View style={{flex: 1, flexWrap: 'wrap', flexDirection:'column', justifyContent: 'center', alignItems:'center',alignContent:'center' , fontSize: 50}}>
            <Text style={{fontSize:30}}>PhotoWall</Text>
        </View>
    )
}

export default Splash
