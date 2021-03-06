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

import OnBoardingScreen from './screens/OnBoardingScreen';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AsyncStorage from '@react-native-community/async-storage';

import {store} from './store';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

const RootStack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const [authenticated, setAutheticated] = React.useState(false);

  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User autrhnticated is done ************');
        setAutheticated(true);
        console.log('USER IS ******', user);
      } else {
        console.log('User autrhnticated is not done  ************');
        setAutheticated(false);
      }
    });
  }, []);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

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
        {isAppFirstLaunched != null && (
          <NavigationContainer theme={theme}>
            {authenticated ? (
              <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
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
                    component={OnBoardingScreen}
                  />
                )}

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
      </PaperProvider>
    </Provider>
  );
};

export default App;
