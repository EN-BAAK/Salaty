import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

const MyStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export default MyStack;