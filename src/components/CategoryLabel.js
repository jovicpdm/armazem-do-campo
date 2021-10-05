import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../global/styles/theme';

// const [state, setstate] = useState(initialState);

const CategoryLabel = ({description, id, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={
          // eslint-disable-next-line no-sequences
          [styles.category, {color: color}]
        }>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryLabel;

const styles = StyleSheet.create({
  category: {
    padding: 8,
    marginRight: 4,
    borderRadius: 4,
    marginTop: 8,
  },
});
