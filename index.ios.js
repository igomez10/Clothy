import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImagePickerIOS,
  Image,
  CameraRoll,
  TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Entypo';

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

  sendPicture() {
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

  takePicture() {
    ImagePickerIOS.canUseCamera(canUse => {
      if (!canUse) {
        AlertIOS.alert('Can\'t use camera', 'We invite you to upload a pic ☺️');
        return;
      }

      ImagePickerIOS.openCameraDialog({}, imageUri => {
        console.log(imageUri);
      }, error => {
        console.log(error);
      });
    })
  }

  uploadPicture() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      console.log(imageUri);
    }, error => {
      console.log(error);
    });
  }

  showCommunity() {
    console.log('ioasdjaiodjas');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.navbar}>

          <View style={{flex: 1}}>

            <Image source={require('./img/logo.png')} style={styles.logoImage} />

          </View>

          <View style={{flex: 1.2}}>

            <Text style={styles.logoText}>
              Clothy
            </Text>

          </View>

        </View>

        <TouchableHighlight onPress={this.uploadPicture} style={styles.uploadContainer} underlayColor='#EFEFEF'>

          <View>

            <Image source={require('./img/upload.png')} style={styles.uploadImage} />

            <Text style={styles.uploadText}>
              Upload a picture
            </Text>

          </View>

        </TouchableHighlight>

        <TouchableHighlight onPress={this.takePicture} style={styles.photoContainer} underlayColor='#95989A'>

          <View>

            <Image source={require('./img/camera.png')} style={styles.photoImage} />

            <Text style={styles.photoText}>
              Take a photo
            </Text>

          </View>

        </TouchableHighlight>

        <TouchableHighlight onPress={this.showCommunity} style={styles.helpContainer} underlayColor='#232323'>

          <View style={{flexDirection: 'row'}}>

            <View style={{flex: 7}}>

              <Text style={styles.helpText}>
                Help others in the community
              </Text>

            </View>

            <View style={{flex: 1}}>

              <Image source={require('./img/right.png')} style={styles.helpImage} />

            </View>

          </View>

        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {height: '100%'},

  navbar: {
    backgroundColor: '#F15F67',
    flex: 86/667,
    borderBottomWidth: 2,
    borderBottomColor: '#D03D45',
    flexDirection: 'row'
  },
  logoImage: {
    height: 32,
    width: 32,
    marginTop: 33,
    marginLeft: 128
  },
  logoText: {
    textAlign: 'left',
    color: '#FFFFFF',
    fontSize: 24,
    marginTop: 35,
    fontFamily: 'Helvetica Neue'
  },

  uploadContainer: {
    backgroundColor: '#EFEFEF',
    flex: 260/667
  },
  uploadImage: {
    height: 146,
    width: 146,
    marginTop: 25,
    marginLeft: 115
  },
  uploadText: {
    textAlign: 'center',
    color: '#95989A',
    fontSize: 34,
    marginTop: 25,
    fontFamily: 'American Typewriter'
  },

  photoContainer: {
    backgroundColor: '#95989A',
    flex: 260/667
  },
  photoImage: {
    height: 146,
    width: 146,
    marginTop: 25,
    marginLeft: 115
  },
  photoText: {
    textAlign: 'center',
    color: '#EFEFEF',
    fontSize: 34,
    marginTop: 25,
    fontFamily: 'American Typewriter'
  },

  helpContainer: {
    backgroundColor: '#232323',
    flex: 60/667
  },
  helpText: {
    textAlign: 'left',
    color: '#EFEFEF',
    fontSize: 20,
    marginTop: 18,
    marginLeft: 20,
    fontFamily: 'Helvetica Neue'
  },
  helpImage: {
    height: 28,
    width: 28,
    marginTop: 16,
    marginRight: 25
  }
});

AppRegistry.registerComponent('Clothy', () => Clothy);
