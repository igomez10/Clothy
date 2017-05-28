import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImagePickerIOS,
    Image,
    CameraRoll,
    ScrollView,
    Button,
} from 'react-native';



export default class Recommendation extends Component {

    render() {
        clickLink = () => {
            this.openUrl(this.props.url)
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <Image style={{width:70,heigth:40}} source={{ uri: this.props.imagen }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text>{this.props.nombre}</Text>
                    <Text>{this.props.tienda}</Text>
                    <Text>{this.props.precio}</Text>
                    <Button onPress={clickLink} title="Store">Abrir Tienda</Button>
                </View>
            </View>
        );
    }
}