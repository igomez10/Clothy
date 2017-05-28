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
} from 'react-native';
import Camera from 'react-native-camera';

var ImagePicker = require('react-native-image-picker');


var options = {
  title: 'Upload Photo',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class Clothy extends Component {
  constructor(props) {
    super(props);
    this.state = { ventana: 'camara', fuente: { uri: "http://media-cdn.tripadvisor.com/media/photo-s/0e/85/48/e6/seven-mile-beach-grand.jpg" }, image: '' }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => (this.setState({ fuente: data.path })))
      .catch(err => console.error(err));
  }

  uploadPicture() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source64 = { uri: 'data:image/jpeg;base64,' + response.data };
        let source = { uri: response.uri };

        this.setState({ fuente: source });

        fetch('http://clothy-dev.us-east-1.elasticbeanstalk.com/recommend', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            img: "'" + source + "'"
          })
        })
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });

  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Clothy
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={this.state.fuente}
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Text style={styles.capture} onPress={this.uploadPicture.bind(this)}>[UPLOAD]</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('Clothy', () => Clothy);
