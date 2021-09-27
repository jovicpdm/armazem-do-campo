import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {theme} from '../global/styles/theme';

const MySearchBar = props => {
  return (
    <Searchbar
      {...props}
      onChangeText={props.onChangeText}
      value={props.value}
      style={styles.input}
      placeholderTextColor={theme.pallete.white}
      iconColor={theme.pallete.white}
      inputStyle={{fontSize: 16}}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
    borderRadius: 8,
    height: 40,
    fontSize: 8,
    backgroundColor: theme.pallete.primary004,
  },
});

export default MySearchBar;
