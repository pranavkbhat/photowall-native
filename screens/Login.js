import React from 'react'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

function Login(props) {

    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError} = props;

    return (
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, backgroundColor: '#fbf5ff'}} >
            <View style={{alignItems: 'center'}} >
                <Text style={{fontFamily: 'billabong', justifyContent: 'center', alignItems: 'center', fontSize: 60, color: '#6800ba' }} >PhotoWall</Text>
            </View>
            <TextInput
                label='Email'
                style={{height: 50}}
                mode= 'outlined'
                value={email}
                onChangeText={setEmail} />
            <Text style={{fontFamily: 'nunito-regular',fontSize: 12 ,margin: 5, color: 'red'}} >{emailError}</Text>
            <TextInput
                secureTextEntry={true}
                label='Password'
                style={{height: 50}}
                mode= 'outlined' 
                value={password}
                onChangeText={setPassword} />
            <Text style={{fontFamily: 'nunito-regular',fontSize: 12, margin: 5, color: 'red'}} >{passwordError}</Text>
            <View style={{marginTop: 0}}>
                {hasAccount ? (
                    <View style={{marginTop: 5}}>
                        <Button 
                            mode='contained' 
                            color='#6a43bf'
                            contentStyle={{height: 45}} 
                            onPress={handleLogin}>
                        LOGIN
                        </Button>
                        <Text style={{fontFamily: 'nunito-bold', color: '#6800ba', marginTop: 10, fontSize: 15}} >Don't have an account? <Text onPress={()=>setHasAccount(!hasAccount)} style={{color: '#ff6700'}} >SignUp</Text></Text>  
                    </View> 
                ):(
                    <View style={{marginTop: 5}}>
                        <Button 
                            mode='contained' 
                            color='#6a43bf'
                            contentStyle={{height: 45}} 
                            onPress={handleSignup}>
                        SIGNUP
                        </Button>
                        <Text style={{fontFamily: 'nunito-bold', color: '#6800ba' ,marginTop: 10, fontSize: 15}}>Have an account? <Text onPress={()=>setHasAccount(!hasAccount)} style={{color: '#ff6700'}}>Login</Text></Text>
                    </View>
                )}        
            </View>  
        </View>
    )
}

export default Login
