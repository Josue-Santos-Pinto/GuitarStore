import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import MainDrawer from '../../Navigators/MainDrawer';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../redux/reducers/userReducer';
import { useNavigation } from '@react-navigation/native';
import Login from '../Login'

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const dispatch = useDispatch()
  const navigation = useNavigation()


  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(()=>{
    if(user){
      dispatch(setEmail(user.email))
    }
  },[user])

  if (initializing) return null;

  if (!user) {
    return <Login />
  }

  return (
    <MainDrawer />
  );
}
export default App