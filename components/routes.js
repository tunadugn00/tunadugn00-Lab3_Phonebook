import React from "react";
import { Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Contacts from "../screens/Contacts";
import Profile from "../screens/Profile";
import Favorites from "../screens/Favorites";
import User from "../screens/User";
import Options from "../screens/Options";
import colors from "../utils/colors";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const getTabBarIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={26} style={{ color }} />
);

const getDrawerIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={24} style={{ color }} />
);

// Individual stack navigators
const ContactsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ContactsList" component={Contacts} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesList" component={Favorites} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const UserStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserProfile" component={User} />
    <Stack.Screen name="Options" component={Options} />
  </Stack.Navigator>
);

// Tab Navigator
const TabNavigator = ({ navigation }) => (
  <Tab.Navigator
    initialRouteName="Contacts"
    barStyle={{ backgroundColor: colors.blue }}
    activeColor={colors.greyLight}
    inactiveColor={colors.greyDark}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Contacts') {
          iconName = 'list';
        } else if (route.name === 'Favorites') {
          iconName = 'star';
        } else if (route.name === 'Me') {
          iconName = 'person';
        }
        return <MaterialIcons name={iconName} size={26} color={color} />;
      },
    })}
  >
    <Tab.Screen
      name="Contacts"
      component={ContactsStack}
      listeners={{
        tabPress: () => {
          navigation.setOptions({ headerTitle: "Contacts" });
        },
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesStack}
      listeners={{
        tabPress: () => {
          navigation.setOptions({ headerTitle: "Favorites" });
        },
      }}
    />
    <Tab.Screen
      name="Me"
      component={UserStack}
      listeners={{
        tabPress: () => {
          navigation.setOptions({ headerTitle: "Me" });
        },
      }}
    />
  </Tab.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.blue },
          headerTintColor: "white",
          drawerActiveTintColor: colors.blue,
          drawerInactiveTintColor: colors.greyDark,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            drawerIcon: getDrawerIcon("home"),
            headerTitle: "Gumayusiuuuu",
          }}
        />
        <Drawer.Screen
          name="Contacts"
          component={ContactsStack}
          options={{
            drawerIcon: getDrawerIcon("list"),
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            drawerIcon: getDrawerIcon("star"),
          }}
        />
        <Drawer.Screen
          name="Me"
          component={UserStack}
          options={{
            drawerIcon: getDrawerIcon("person"),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;

const CallScreens = () => {
  Linking.openURL(`tel:*101\#`);
};