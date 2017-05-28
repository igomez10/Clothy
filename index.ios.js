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
import Icon from 'react-native-vector-icons/Entypo';

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
    this.state = { ventana: 'camara', fuente: null, image: '', recommendations: [] }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => { })
      .catch(err => console.error(err));
  }
  // componentWillMount() {
  //   CameraRoll.getPhotos({ first: 5 }).then((response) => (console.log(response))).catch((err) => (console.log(err)))
  // }


  uploadPicture() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ');
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
        let imgData = response.data;
        let imgName = response.fileName;
        this.setState({ fuente: source });

        fetch('http://clothy-dev.us-east-1.elasticbeanstalk.com/recommend', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            img: imgData,
            img_key: imgName,
          })
        })
          .then((serverResponse) => {
            let body = JSON.parse(serverResponse._bodyText);
            this.setState({ recommendations: body.recommendations})
          })
          .catch((err) => (console.log(err)))
      }
    });

  }



  render() {
    return (
      <View style={styles.container}>

        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={{ marginTop: 20, fontSize: 30, top: -180, color: 'white', backgroundColor: 'transparent' }}>
            Clothy {this.state.recommendations.length}
        </Text>
          <Image
            style={{ width: 300, height: 300, top: -80 }}
            source={this.state.fuente}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}><Icon name="camera" size={30} color="black" /></Text>
            <Text style={styles.capture} onPress={this.uploadPicture.bind(this)}><Icon name="image" size={30} color="black" /></Text>
            <Text onPress={this.lastPicture} >Ultima</Text>
          </View>
        </Camera>
      </View >
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
