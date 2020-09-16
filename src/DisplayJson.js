import React from 'react';
import { View, Text } from 'react-native';

const DisplayJson = (props) => {
    const { data } = props.route.params;
    return (
        <View>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    )
}

export default DisplayJson;