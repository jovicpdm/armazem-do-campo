import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {theme} from '../global/styles/theme';

const ProductCard = ({name, price, image, onPress}) => {
  return (
    <View>
      <Card style={styles.card} elevation={1} mode="outlined" onPress={onPress}>
        <Card.Content style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: `data:image/gif;base64,${image}`}}
          />
          <Card.Content>
            <Title>{name}</Title>
            <Paragraph>R$ {price}</Paragraph>
          </Card.Content>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    backgroundColor: theme.pallete.white,
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
});

export default ProductCard;
