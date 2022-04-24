import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

import Loading from '../components/Loading';
import PokeList from '../components/PokeList';

export default function Home({ navigation }) {

    const [search, setSearch] = useState('');
    const [searchRange, setSearchRange] = useState({start: 1, end: 30})
    const [isLoading, setIsLoading] = useState(false);
    const [pokemones, setPokemones] = useState([]);

    useEffect(() => {
        async function getPoke() {
            setIsLoading(true);
            let newPokemones = [];

            for (let i = searchRange.start; i <= searchRange.end; i++) {
                
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((response) => {
                    newPokemones.push({
                        name: response.data.name,
                        img: response.data.sprites.other.['official-artwork'].front_default,
                        id: response.data.id
                    });

                    setPokemones(newPokemones);
                })
                .catch((error) => {
                    console.log(error);
                });
            }

            setIsLoading(false);
        }

        getPoke();
    }, [searchRange]);

    const handleSearch = async () => {
        
        if(!search) return
        
        setIsLoading(true);
        let newPokemones = [];

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLocaleLowerCase()}`)
        .then((response) => {
            newPokemones.push({
                name: response.data.name,
                img: response.data.sprites.other.['official-artwork'].front_default,
                id: response.data.id
            });

            setPokemones(newPokemones);
            setSearch('');
        })
        .catch((error) => {
            alert("Sorry!, no match with " + search + " request.");
        });

        setIsLoading(false);
    }

    const handleCounterView = (type) => {
        if (type === 'left' && searchRange.start > 30) { setSearchRange({start: (searchRange.start - 30), end: (searchRange.start - 1)}) }
        if (type === 'refresh') { setSearchRange({start: searchRange.start, end: searchRange.end}) }
        if (type === 'right') { setSearchRange({start: (searchRange.end + 1) ,end: (searchRange.end + 30)}) }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/logo.png')}
            />

            <View style={styles.searchContainer}>
                <TextInput style={styles.input} placeholder="Find a pokémon {name/id}" value={search} onChangeText={text => setSearch(text)}/>
                <Icon containerStyle={styles.icon} name='search' type='font-awesome' color='#000' onPress={handleSearch}/>
            </View>

            <View style={[styles.searchContainer, { backgroundColor: 'transparent' }]}>                
                
                <TouchableOpacity onPress={() => handleCounterView('left')}>
                    <Icon containerStyle={styles.icon} name='arrow-left' type='font-awesome' color='#000'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCounterView('refresh')}>
                    <Icon containerStyle={styles.icon} name='refresh' type='font-awesome' color='#000'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCounterView('right')}>
                    <Icon containerStyle={styles.icon} name='arrow-right' type='font-awesome' color='#000'/>
                </TouchableOpacity>
            </View>

            <PokeList pokemones={pokemones} navigation={navigation}/>

            <Loading isVisible={isLoading} text="Cargando" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#E7E7E7',
        marginTop: 15,
        width: '90%',
        borderRadius: 15,
    },
    input: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        backgroundColor: '#aaa',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15
    }
});
