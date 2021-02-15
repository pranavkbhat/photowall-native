import React, {useState, useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider, Menu} from 'react-native-paper';
// import AppLoading from 'expo-app-loading';
import Splash from './screens/Splash'
import { useFonts } from 'expo-font';
import Main from './screens/Main';
import addPhoto from './screens/addPhoto'
import Single from './screens/Single'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducer'
import { Provider } from 'react-redux'
import Login from './screens/Login';
import fire from './database/config'
import thunk from 'redux-thunk'
import {startLoadingPost, startLoadingComments} from './redux/actions'

const store = createStore(rootReducer, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#6800b8',
    accent: '#03dac4',
    background: '#ffffff',
    surface: 'white',
    error: '#B00020',
    text: 'black',
    onBackground: '#000000',
    onSurface: '#000000',
  }
} 

function CustomNavigationBar({ navigation, previous, handleLogout }) {

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{backgroundColor: 'white'}} >
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="PhotoWall" titleStyle={{fontFamily: 'billabong', fontSize: 40, marginTop: 20}}/>
      {!previous ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="black" onPress={openMenu} />
          }>
          <Menu.Item  onPress={() => (navigation.navigate('Add Photo'), setVisible(false))} title="add photo" icon='plus'/>
          <Menu.Item onPress={()=>(handleLogout())} title="logout" icon='logout' />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

const Stack = createStackNavigator();

const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
      setEmail('');
      setPassword('');
    }
  
    const clearErrors = () => {
      setEmailError('');
      setPasswordError('');
    }
  
    const handleLogin = () => {
      clearErrors();
      fire.auth().signInWithEmailAndPassword(email, password).catch((err) => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
    }
  
    const handleSignup = () => {
      clearErrors();
      fire.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
    }
  
    const handleLogout = () => {
      fire.auth().signOut();
    } 

    useEffect(()=>{
      const authListener = () => {
          fire.auth().onAuthStateChanged((user)=>{
            if(user){
              clearInputs();
              setUser(user);
            }else{
              setUser("");
            }
          })
        }
        authListener();
        startLoadingPost();
        startLoadingComments();
      }, []);

  let [fontsLoaded] = useFonts({
    'billabong': require('./assets/fonts/FontsFree-Net-Billabong.ttf'),
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <Splash />;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          {user ? (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{header: (props) => <CustomNavigationBar {...props} handleLogout={handleLogout} />}}>
                <Stack.Screen name="Home" component={Main}/>
                <Stack.Screen name="Add Photo" component={addPhoto} />
                <Stack.Screen name='single' component={Single} /> 
              </Stack.Navigator>
            </NavigationContainer>
          ):(
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
          )}
        </PaperProvider>
      </Provider>
    );
  }
}

export default App