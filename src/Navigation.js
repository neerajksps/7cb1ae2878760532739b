// import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as React from 'react';
import { Easing, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStackStyleInterpolator } from '@react-navigation/stack';
import HomeScreen from './Home';
import DisplayJsonScreen from './DisplayJson';

const Stack = createStackNavigator();

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MyTransitionSpec = ({
  duration: 1000,
  easing: Easing.linear,
  timing: Animated.timing,
});

const transitionConfig = () => ({
  transitionSpec: MyTransitionSpec,
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    
    const { index } = scene;
    const width = layout.initWidth;
    const height = layout.initHeight;
      const inputRange = [index - 1, index, index + 1];

      const translateX = position.interpolate({
        inputRange,
        outputRange: ([width, 0, 0]),
      });

      return {

        transform: [
          { translateX },
        ],
        duration: 50
      };
    }
  
});

const transitionAnim = ({ current, next, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          rotate: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              })
            : 1,
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    }
}
}


export default Navigation = () => {
return (

<NavigationContainer

>
      <Stack.Navigator
       screenOptions={{ headerShown: false,}}
      
        initialRouteName="List" 
      >
        <Stack.Screen  name="Home" component={HomeScreen} 
          options={{
            cardStyleInterpolator: transitionConfig
          }}
        />

        <Stack.Screen  name="displayJson" component={DisplayJsonScreen} 
          options={{
              cardStyleInterpolator: transitionAnim
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
)
}
// export default createAppContainer(navigator);