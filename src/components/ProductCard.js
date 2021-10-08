import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const ProductCard = ({name, price, image}) => {
  return (
    <Card>
      <Card.Title
        title={name}
        subtitle={price}
        left={image => {
          <Image style={styles.image} />;
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});
