import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;


import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {DrawerContent} from './screens/DrawerContent';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

 
 import OnBoardingScreen from './screens/OnBoardingScreen';

import AsyncStorage from '@react-native-community/async-storage';
import {store} from './store';
import {Provider} from 'react-redux';

const Drawer = createDrawerNavigator();

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }

     
  }, []);

 
 
  

   

 

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          {isAppFirstLaunched != null && (
            <NavigationContainer theme={theme}>
              {loginState.userToken !== null ? (
                <Drawer.Navigator
                  drawerContent={props => <DrawerContent {...props} />}>
                  <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                  <Drawer.Screen
                    name="SupportScreen"
                    component={SupportScreen}
                  />
                  <Drawer.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                  />
                  <Drawer.Screen
                    name="BookmarkScreen"
                    component={BookmarkScreen}
                  />
                </Drawer.Navigator>
              ) : (
                <RootStack.Navigator headerMode="none">
                  {isAppFirstLaunched && (
                    <RootStack.Screen
                      name="OnboardingScreen"
                      component={OnboardingScreen}
                    />
                  )}

                  {/* <RootStack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                  /> */}
                  <RootStack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                  />
                  <RootStack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                  />
                </RootStack.Navigator>
              )}
            </NavigationContainer>
          )}
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
