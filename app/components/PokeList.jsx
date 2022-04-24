
import React from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

export default function PokeList({ pokemones, navigation }) {

    return (
        <View style={styles.container}>

            <FlatList
                data={pokemones}
                renderItem={({item}) => <PokeItem item={item} navigation={navigation}/>}
                keyExtractor={(item, index) => item.id }
                numColumns={2}
            />

        </View>
    )
}

function PokeItem({ item, navigation }) {

    const { name, img, id } = item;

    return(
        <TouchableOpacity style={styles.pokeItem} onPress={() => navigation.navigate('Detail', {id})}>
            <Image style={styles.image} source={{ uri: img, }} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>#{id}</Text>
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 5
    },
    pokeItem: {
        backgroundColor: '#00A3FF',
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 5,
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        top: -20,
    },
    textContainer: {
        backgroundColor: '#2E4053',
        top: -15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    text: {
        color: 'white',
        padding: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    }
});