import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import moment from 'moment';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            fetchedData: []
        }
    }

    componentDidMount() {
        const { count } = this.state;
        this.fetchData(count,'first');    //fetch data first time with zero page count
        setInterval(() => { this.fetchData(count,'new')  }, 10000)  //fetch data after each 10 seconds with new page count
    }

    fetchData(count,type) {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`, {
            method: 'GET',
        }).then(res => {
            statusCode = res.status
            return res.json()
        }).then(response => {
            if(type == 'first') {
                this.setState({ fetchedData: response.hits, count: this.state.count + 2 })
            }
            else {
                let newData = [];
                console.log('fetched new data======', this.state.fetchedData);

                newData = this.state.fetchedData.concat(response.hits);
                this.setState({ fetchedData: newData, count: this.state.count + 2 })
            }
            console.log('response gettingg=========', response)
        }).catch((error) => {
            alert(error.message)
            console.log('error getting===========',error)
        })
    }

    render() {
        const { fetchedData, count } = this.state;
        return (
            <View style={styles.wholeViewStyle}>
                {
                    (fetchedData.length > 0)?
                        <View style={styles.itemsWholeViewStyle}>
                            <FlatList
                                data={fetchedData}
                                keyExtractor={(item, index) => index + 'data'}
                                showsVerticalScrollIndicator={false}
                                onEndReached={() => this.fetchData(count,'new')} //fetch data when list is scrolled to end with new page count
                                extraData={fetchedData}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity 
                                        activeOpacity={0.7}
                                        style={styles.containerViewStyle}
                                        onPress={() => this.props.navigation.navigate('displayJson', { data: item })}
                                    >
                                        <View style={styles.itemsInRowViewStyle}>
                                            <Text style={styles.containerTitleTextStyle}> 
                                                Title:
                                            </Text>
                                            <View style={styles.containerTitleViewStyle}>
                                                <Text 
                                                    numberOfLines={2}
                                                    ellipsizeMode={'tail'}
                                                    style={styles.containerValueTextStyle}> 
                                                    {item.title} 
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.itemsInRowViewStyle}>
                                            <Text style={styles.containerTitleTextStyle}> 
                                                Url:
                                            </Text>
                                            <View style={styles.containerTitleViewStyle}>
                                                <Text 
                                                    numberOfLines={2}
                                                    ellipsizeMode={'tail'}
                                                    style={styles.containerValueTextStyle}> 
                                                    {item.url} 
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.itemsInRowViewStyle}>
                                            <Text style={styles.containerTitleTextStyle}> 
                                                Created At:
                                            </Text>
                                            <View style={styles.containerTitleViewStyle}>
                                                <Text 
                                                    numberOfLines={2}
                                                    ellipsizeMode={'tail'}
                                                    style={styles.containerValueTextStyle}> 
                                                    {moment(item.created_at).format('DD MM YYYy hh: mm A')} 
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                        </View>:
                        <View style={styles.noItemFoundViewStyle}>
                            <ActivityIndicator
                                color={'blue'}
                                size={'large'}
                            />
                        </View>
                }    
            </View>
        )
    }
}

const styles = StyleSheet.create({

    wholeViewStyle: {
        flex: 1,
        backgroundColor: 'white'
    },

    textStyle: {
        color: 'black',
        fontSize: 45,
        flexWrap: 'wrap'
    },

    itemsWholeViewStyle: {
        marginHorizontal: 15,
        marginTop: 15
    },

    containerViewStyle: {
        borderWidth: 0.8,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
    },

    itemsInRowViewStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    containerTitleTextStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 10
    },

    containerValueTextStyle: {
        fontSize: 16,
        color: 'black'
    },

    containerTitleViewStyle: {
        flex: 1
    },

    noItemFoundViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default Home;