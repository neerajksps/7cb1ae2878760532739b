import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const text2 =  () => {
    return (
        <Text>My name is needraj</Text>

    )
}
const Home = ({ navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.push('Profile')}
            style={styles.wholeViewStyle}
        >
            <Text style={styles.textStyle}>
                Getting started with react native!
            </Text>
            {text2()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    wholeViewStyle: {
        flex: 1,
        backgroundColor: 'white'
    },

    textStyle: {
        color: 'black',
        fontSize: 45
    }
})

export default Home;