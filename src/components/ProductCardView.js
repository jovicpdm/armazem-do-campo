import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import {theme} from '../global/styles/theme';

const ProductCardView = ({
  name,
  price,
  image,
  description,
  formOfSale,
  amount,
}) => {

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: `data:image/gif;base64,${image}`}}
        />
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>
            R$ {price} {formOfSale}
          </Text>
          <Text style={styles.subtitle}>{description}</Text>
          <Text style={styles.subtitle}>Quantidade: {amount}</Text>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 2,
    marginTop: 12,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    elevation: 2,
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowOpacity: 0.2,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 100,
    borderRadius: 8,
  },
  titleSubtitle: {
    flexDirection: 'column',
    marginLeft: 8,
    alignContent: 'space-around',
  },
  title: {
    color: theme.pallete.black,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  subtitle: {
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});

export default ProductCardView;