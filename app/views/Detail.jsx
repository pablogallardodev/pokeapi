import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

import Loading from '../components/Loading';

export default function Detail({ route }) {

    const { id } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState({});
    const [pokeId, setPokeID] = useState(id);

    useEffect(() => {
        async function getPoke() {
            setIsLoading(true);
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then((response) => {
                setPokemon({
                    name: response.data.name,
                    img: response.data.sprites.other.['official-artwork'].front_default,
                    id: response.data.id,
                    types: response.data.types,
                    stats: response.data.stats,
                    abilities: response.data.abilities
                });
            })
            .catch((error) => {
                console.log(error);
            });            
            setIsLoading(false);
        }

        getPoke();
    },[pokeId])

    return (
        <ScrollView>
            <View style={styles.container}>
            <Image
                source={require('../../assets/img/logo.png')}
            />
            
            <View style={styles.navContainer}>
                <TouchableOpacity style={styles.moveItem} onPress={() => pokeId > 1 ? setPokeID(pokeId - 1) : null}>
                    <Icon name='arrow-left' type='font-awesome' color='#000'/>
                    <Text style={styles.text}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moveItem} onPress={() => setPokeID(pokeId + 1)}>
                    <Text style={styles.text}>Next</Text>
                    <Icon name='arrow-right' type='font-awesome' color='#000'/>
                </TouchableOpacity>
            </View>

            <Text style={[styles.text, {fontSize: 22, fontWeight: 'bold', paddingHorizontal: 5,}]}>
                {pokemon.name} N°. {pokemon.id}
            </Text>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: pokemon.img, }} />
            </View>

            <View style={{width: '90%', marginTop: 10,}}>
                <Text style={[styles.text, {fontSize: 22, fontWeight: 'bold', paddingHorizontal: 5,}]}>Abilities</Text>

                <View style={styles.infoContainer}>
                {
                    pokemon?.abilities?.map(({ ability, slot }) =>{
                        return <Text
                                key={slot}
                                style={[styles.text, { backgroundColor: '#2E4053', borderRadius: 10, color: 'white' }]}>
                                    {ability.name}
                                </Text>
                    })
                }
                </View>  
            </View>

            <View style={{width: '90%', marginTop: 10,}}>
                <Text style={[styles.text, {fontSize: 22, fontWeight: 'bold', paddingHorizontal: 5,}]}>Types</Text>

                <View style={styles.infoContainer}>
                {
                    pokemon?.types?.map(({ type, slot }) =>{
                        return <Text
                                key={slot}
                                style={[styles.text, { backgroundColor: '#2E4053', borderRadius: 10, color: 'white' }]}>
                                    {type.name}
                                </Text>
                    })
                }
                </View>  
            </View>

            <View style={{width: '90%', marginTop: 10,}}>
                <Text style={[styles.text, {fontSize: 22, fontWeight: 'bold', paddingHorizontal: 5,}]}>Stats</Text>

                <View style={styles.infoContainer}>
                {
                    pokemon?.stats?.map(({ stat, base_stat }, index) =>{
                        return <Text
                                key={index}
                                style={[styles.text, { backgroundColor: '#2E4053', borderRadius: 10, color: 'white' }]}>
                                    {stat.name}: {base_stat}
                                </Text>
                    })
                }
                </View>  
            </View> 

            <Loading isVisible={isLoading} text="Cargando" />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    imageContainer:{
        backgroundColor: '#00A3FF',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 50,
        width: '90%',
        height: '20%',

    },
    image: {
        width: 200,
        height: 200,
        top: -50,
    },
    navContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    moveItem: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAA',
        padding: 5,
        borderRadius: 20,
    },
    text: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 5,
        fontSize: 18,
        textTransform: 'capitalize',
    }
})