import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

// const [state, setstate] = useState(initialState);

const CategoryLabel = ({description, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.category, {color: color}]}>{description}</Text>
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
    fontSize:18
  },
});
