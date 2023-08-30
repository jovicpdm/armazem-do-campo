import React from 'react';
import { StyleSheet, FlatList, View, Image, Linking } from 'react-native';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import WhiteArea from '../components/WhiteArea';
import Logo from '../components/Logo';
import { Text } from 'react-native-elements';

import { theme } from '../global/styles/theme';

export default function Devs() {
  return (
    <>
      <Logo />
      <TopScreen>
        <TitleScreen>Desenvolvedores</TitleScreen>
      </TopScreen>
      <WhiteArea>

        <View style={styles.devContainer}>
          <Image source={require('../../src/assets/imgsDevs/joaoVictor.jpg')} style={styles.devImage} />
          <Text h4 style={styles.text}>João Victor Morais</Text>
          <Text style={styles.text}>Sou desenvolvedor Fullstack, com experiência em desenvolvimento web. Com foco em React</Text>
          <Text  style={styles.link} onPress={() => Linking.openURL('https://github.com/jovicpdm')}>https://github.com/jovicpdm</Text>
        </View>

        <View style={styles.devContainer}>
          <Image source={require('../../src/assets/imgsDevs/santosjao.jpg')} style={styles.devImage} />
          <Text h4 style={styles.text}>João Santos</Text>
          <Text style={styles.text}>Desenvolvedor Web e Mobile</Text>
          <Text  style={styles.link} onPress={() => Linking.openURL('https://github.com/santos-joao07')}>https://github.com/santos-joao07</Text>
        </View>

        <View style={styles.devContainer}>
          <Image source={require('../../src/assets/imgsDevs/jefersonFerreira.jpg')} style={styles.devImage} />
           <Text h4 style={styles.text}>Jeferson Ferreira</Text>
          <Text style={styles.text} >Desenvolvedor Web, com foco em back-end</Text>
          <Text  style={styles.link} onPress={() => Linking.openURL('https://github.com/jf2s')}>https://github.com/jf2s</Text>
        </View>

        <View style={styles.devContainer}>
          <Image source={require('../../src/assets/imgsDevs/ralf.jpg')} style={styles.devImage} />
           <Text h4 style={styles.text}>Ralf Alan</Text>
          <Text style={styles.text}>Desenvolvedor mobile Flutter</Text>
          <Text  style={styles.link} onPress={() => Linking.openURL('https://github.com/ralfhalan')}>https://github.com/ralfhalan</Text>
        </View>

        <View style={styles.devContainer}>
          <Image source={require('../../src/assets/imgsDevs/alife.jpg')} style={styles.devImage} />
          <Text h4 style={styles.text}>Álife Silva De Moraes</Text>
          <Text style={styles.text}>Desenvolvedor Web, com foco em back-end</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/alife-echo')}>https://github.com/alife-echo</Text>
        </View>
        
        
      </WhiteArea>
    </>
  );
}

const styles = StyleSheet.create({
  devContainer: {
    marginBottom: 20,
    alignItems: 'center',
    marginTop:20
  },
  devImage: {
    width: 115,
    height: 115,
    borderRadius: 50,
    marginBottom: 10,
  },
  text:{
    textAlign:'center',
    fontSize:16
  },
  link:{
    color:theme.pallete.blue,
    fontSize:15
  }
});
