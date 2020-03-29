import React from "react";
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TopScreen, SignInScreen, SignUpScreen } from "./containers/auth";
import { SearchScreen, SearchConditionScreen } from "./containers/navigation/search";

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

function SearchStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchCondition" component={SearchConditionScreen} />
    </Stack.Navigator>
  );
}


function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchStack} />
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
          <Stack.Screen name="Navigation" component={Navigation} />
        ) : (
          <Stack.Screen name="Top" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
