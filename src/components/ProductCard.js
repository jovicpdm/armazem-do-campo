import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {theme} from '../global/styles/theme';

const ProductCard = ({name, price, image, onPress}) => {
  return (
    <Card style={styles.card} elevation={0} mode="outlined" onPress={onPress}>
      <Card.Content style={styles.container}>
        <Card.Cover source={image} style={styles.image} />
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>{price}</Paragraph>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
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
