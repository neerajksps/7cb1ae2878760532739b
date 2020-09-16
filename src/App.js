import React from 'react';
import { View, Text } from 'react-native';
import Navigation from './Navigation';

const App = () => {
    return (
        <View style={styles.wholeViewStyle}>
            <Navigation />
        </View>
    )   
}

const styles = {
    wholeViewStyle: {
        flex:1
    }
}

export default App;