import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TopScreen, SignInScreen } from "./containers/auth";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="Top" component={TopScreen} options={{headerShown: false }}/>
      <Stack.Screen name="SignIn" component={SignInScreen}/>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TopScreen} />
      <Tab.Screen name="Settings" component={TopScreen} />
    </Tab.Navigator>
  );
}

export function AppContainer(){
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {true ? (
          <>
            <Stack.Screen name="Topa" component={MyTabs} />
          </>
        ) : (
          <Stack.Screen name="Top" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
