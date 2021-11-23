import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input} from 'react-native-elements';

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
          <Input
            placeholder="0"
            keyboardType="numeric"
            containerStyle={{
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              alignSelf: 'center'
            }}
            inputStyle={{
              textAlign: 'center',
            }}
            selectionColor={theme.pallete.primary002}
            maxLength={2}
          />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Produto 2</Text>
            <Text style={styles.subText}>R$ 2,50 (litro)</Text>
          </View>
          <Input
            placeholder="0"
            keyboardType="numeric"
            containerStyle={{
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              alignSelf: 'center'
            }}
            inputStyle={{
              textAlign: 'center',
            }}
            selectionColor={theme.pallete.primary002}
            maxLength={2}
          />
        </View>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
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

  }
});
