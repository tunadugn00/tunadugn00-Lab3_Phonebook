import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import ContactsScreens from "../screens/ContactsScreens";
import FavoritesScreens from "../screens/FavoritesScreens";
import UserScreens from "../screens/UserScreens";
import Profile from "../screens/Profile";
import colors from "../utils/colors";

const getDrawerItemIcon = (iconName) => ({ color }) => (
  <MaterialIcons name={iconName} size={24} color={color} />
);

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: colors.blue },
      headerTintColor: "white",
      drawerActiveTintColor: colors.blue,
      drawerInactiveTintColor: colors.greyDark,
      drawerIcon: ({ color }) => {
        let iconName;
        if (route.name === "ContactsScreens") {
          iconName = "list";
        } else if (route.name === "FavoritesScreens") {
          iconName = "star";
        } else if (route.name === "UserScreens") {
          iconName = "person";
        }
        return <MaterialIcons name={iconName} size={24} color={color} />;
      },
    })}
  >
    <Drawer.Screen
      name="ContactsScreens"
      component={ContactsScreens}
      options={{
        drawerIcon: getDrawerItemIcon("list"),
      }}
    />
    <Drawer.Screen
      name="FavoritesScreens"
      component={FavoritesScreens}
      options={{
        drawerIcon: getDrawerItemIcon("star"),
      }}
    />
    <Drawer.Screen
      name="UserScreens"
      component={UserScreens}
      options={{
        drawerIcon: getDrawerItemIcon("person"),
      }}
    />
  </Drawer.Navigator>
);

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="DrawerScreens" 
        component={DrawerScreens} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: colors.blue },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;