import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View,
  Linking,
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
    const recommendations = [
      {
        'id': 1,
        'title': 'Tshirt 1',
        'store': 'Zara',
        'price': 30,
        'buy_url': 'https://www.zara.com/us/',
        'img_url': 'https://s3.amazonaws.com/elasticbeanstalk-us-east-1-090974648229/clothy/IMG_0023.JPG',
        'currency': 'USD'
      },
      {
        'id': 2,
        'title': 'Tshirt 2',
        'store': 'Zara',
        'price': 14,
        'buy_url': 'https://www.zara.com/us/',
        'img_url': 'https://s3.amazonaws.com/elasticbeanstalk-us-east-1-090974648229/clothy/IMG_0023.JPG',
        'currency': 'USD'
      },
      {
        'id': 3,
        'title': 'Tshirt 3',
        'store': 'Tennis',
        'price': 22,
        'buy_url': 'https://www.zara.com/us/',
        'img_url': 'https://s3.amazonaws.com/elasticbeanstalk-us-east-1-090974648229/clothy/IMG_0023.JPG',
        'currency': 'USD'
      }
    ];
    this.state = { view: 'list', recommendations: recommendations };
    this.takePicture = this.takePicture.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.openBuy = this.openBuy.bind(this);
  }

  sendPicture(imageUri) {
    this.setState({view: 'list'});
    console.log('Sending pic: ' + imageUri);
    /*
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
    */
  }

  takePicture() {
    ImagePickerIOS.canUseCamera(canUse => {
      if (!canUse) {
        AlertIOS.alert('Can\'t use camera', 'We invite you to upload a pic ☺️');
        return;
      }
      ImagePickerIOS.openCameraDialog({}, imageUri => this.sendPicture(imageUri), () => {});
    });
  }

  uploadPicture() {
    ImagePickerIOS.openSelectDialog({}, imageUri => this.sendPicture(imageUri), () => {});
  }

  showCommunity() {
    AlertIOS.alert('Not implemented', 'Wait for this in the next version ☺️');
  }

  askCommunity() {
    AlertIOS.alert('Not implemented', 'Wait for this in the next version ☺️');
  }

  openBuy(item) {
    return () => {
      Linking.openURL(item.buy_url).catch(err => {
        AlertIOS.alert('An error occurred', err);
      });
    }
  }

  index() {
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

        { !this.state.camara && <TouchableHighlight onPress={this.uploadPicture} style={styles.uploadContainer} underlayColor='#EFEFEF'>

          <View>

            <View src={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              
              <Image source={require('./img/upload.png')} style={styles.uploadImage} />
            
            </View>

            <Text style={styles.uploadText}>
              Upload a picture
            </Text>

          </View>

        </TouchableHighlight>

        <TouchableHighlight onPress={this.takePicture} style={styles.photoContainer} underlayColor='#95989A'>

          <View>

            <View src={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              
              <Image source={require('./img/camera.png')} style={styles.photoImage} />
            
            </View>

            <Text style={styles.photoText}>
              Take a photo
            </Text>

          </View>

        </TouchableHighlight>}

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

  list() {
    const recommendations = this.state.recommendations.map(item => {
      return (
        <View key={item.id + ''} style={styles.itemContainer}>

          <View style={{flex: 1.4}}>

            <Image style={{width: '100%', height: 123}} source={{uri: item.img_url}} />

          </View>

          <View style={{flex: 3, marginLeft: 10}}>
          
            <Text style={styles.itemText}>{item.title}</Text>

            <Text style={styles.itemText}>{item.store}</Text>

            <Text style={styles.itemText}>${item.price} {item.currency}</Text>

            <Text style={styles.itemUrl} onPress={this.openBuy(item)}>
              Go to the website
            </Text>

          </View>

        </View>
      );
    });

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

        <View style={styles.headerContainer}>

          <Text style={styles.headerTitle}>
            Our Recommendations
          </Text>

        </View>

        <View style={{flex: 457/667}}>

          {recommendations}

        </View>

        <TouchableHighlight onPress={this.askCommunity} style={styles.helpContainer} underlayColor='#232323'>

          <View style={{flexDirection: 'row'}}>

            <View style={{flex: 7}}>

              <Text style={styles.helpText}>
                No results? Ask the community!
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

  render() {
    if (this.state.view === 'index') {
      return this.index();
    } else { // if (this.state.view === 'list') {
      return this.list();
    }
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
    alignSelf: 'center'
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
    alignSelf: 'center'
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
    marginRight: 25,
  },

  headerContainer: {
    flex: 62/667,
    backgroundColor: '#FFFFFF'
  },
  headerTitle: {
    color: '#95989A',
    fontSize: 26,
    marginTop: 15,
    marginLeft: 20,
    fontFamily: 'American Typewriter'
  },

  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#EFEFEF'
  },
  itemText: {
    color: '#95989A',
    fontSize: 18,
    marginBottom: 5
  },
  itemUrl: {
    color: '#F15F67',
    fontSize: 18,
    marginTop: 16
  }
});

AppRegistry.registerComponent('Clothy', () => Clothy);
