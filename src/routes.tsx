import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TopScreen } from "./containers/auth";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="Top" component={TopScreen} options={{headerShown: false }}/>
    </Stack.Navigator>
  );
}

export function AppContainer(){
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {true ? (
          <>
            <Stack.Screen name="Top" component={AuthStack} />
          </>
        ) : (
          <Stack.Screen name="Top" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
