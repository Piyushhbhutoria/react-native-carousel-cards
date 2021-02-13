/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { RNCarousel } from '@imidiotic/react-native-carousel-cards';
import React from 'react';
import {
  StatusBar, StyleSheet,
  Text, View
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>React Native Carousel</Text>
        </View>
        <RNCarousel
          isLocal={false}
          data={[
            { url: "https://multimediarepository.amadeus.com/cmr/retrieve/hotel/366DB6FB8EFD44C4B2ADC90D38D82C2E" },
            { url: "https://multimediarepository.amadeus.com/cmr/retrieve/hotel/AF63CB0620F94B6FAE8B5BD390C58213" },
            { url: "https://multimediarepository.amadeus.com/cmr/retrieve/hotel/895A263C718547B38011E65E53A7085A" },
            { url: "https://multimediarepository.amadeus.com/cmr/retrieve/hotel/186D75B7A075470F95C7DF5E99F87380" },
          ]} />
        <RNCarousel
          isLocal
          data={[
            { loc: require("./assets/image1.jpg") },
            { loc: require("./assets/image2.jpg") },
            { loc: require("./assets/image3.jpg") },
            { loc: require("./assets/image4.jpg") },
          ]} />
      </>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
