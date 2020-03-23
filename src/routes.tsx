import React from "react";
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TopScreen, SignInScreen, SignUpScreen } from "./containers/auth";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="Top" component={TopScreen} options={{headerShown: false }}/>
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
    </Stack.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TopScreen} />
      <Tab.Screen name="Settings" component={TopScreen} />
    </Tab.Navigator>
  );
}

async function alreadySignIn() {
  let accessKey = "";
  try {
    accessKey = await SecureStore.getItemAsync("accessKey")
  } catch (error) {
  }
  if(accessKey){
    return true
  } else {
    return false
  }
}


export function AppContainer(){
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {alreadySignIn() ? (
          <Stack.Screen name="Navigation" component={MyTabs} />
        ) : (
          <Stack.Screen name="Top" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
