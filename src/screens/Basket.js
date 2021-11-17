import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import {theme} from '../global/styles/theme';

export default function Basket() {
  return (
    <View>
      <TopScreen>
        <TitleScreen>Cesta</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <View style={styles.itemContainer}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Produto 1</Text>
            <Text style={styles.subText}>R$ 2,50 (litro)</Text>
          </View>
          <View style={styles.productInfo}>
            <TextInput style={styles.input}  />
          </View>
        </View>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    // padding: 8,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    color: theme.pallete.primary002,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    textAlign: 'right',
  },
  subText: {
    fontSize: 10,
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
  },
  productInfo: {
    alignItems: 'flex-start',
  },
  input: {
    borderWidth: 1,
    width: 30,
    height: 35,
    borderRadius: 8,
  },
});
