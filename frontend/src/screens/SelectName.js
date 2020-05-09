import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from '../components/firebase';
import Home from './Home.js';

export default function SelectName(props) {
    const [plantName, setPlantName] = useState('');
    const { navigate } = props.navigation;
    const plant = props.navigation.state.params.plant;
    const pot = props.navigation.state.params.pot;
    const potId = props.navigation.state.params.potId;

    console.disableYellowBox = true;

    // adds new plants data to firebase database table "own plants"
    // data are received with props from previous screens SelectPlant.js and SelectPot.js
    // user is taken back to Home.js screen
    addPlantToDatabase = () => {
        firebase.database().ref('omatkasvit/').push(
            {
                'kasvi': plant,
                'ruukku': pot,
                'nimi': plantName,
                'paivays': Date(),
                'ruukkuid': potId 
            }
        )
        navigate('Home', {showSnackbar: true, plantName: plantName})
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headertitle}>Lisää kasvi</Text>
            </View>

            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.container}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Melkein valmista!</Text>
                        <Text style={styles.text}>Anna vielä kasvillesi nimi</Text>
                    </View>
                    <Image style={styles.middleimage} source={require('../assets/plant_img/aloe_vera.png')} />
                    <Input
                        placeholder='Anna kasville nimi'
                        inputContainerStyle={styles.textinput}
                        clearButtonMode='always'
                        onChangeText={text => setPlantName(text)}
                        returnKeyType='done'
                        onSubmitEditing={addPlantToDatabase}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset:{
            height: 2,
            width: 2
        },
        backgroundColor: '#FAFAFA'
    },
    headertitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 48,
        paddingBottom: 20,
        borderBottomColor: '#DEDDDD', 
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        color: '#404040',
        alignSelf: 'center'
    },
    middleimage: {
        width: 200,
        height: 200,
        margin: 25,
        alignSelf: 'center'
    },
    textinput: {
        width: 350,
        alignSelf: 'center'
    }

});