import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../global/styles/theme';

const AdminNotification = ({children}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <Icon
        name="arrow-right-bold-circle-outline"
        type="material-community"
        size={24}
        color={theme.pallete.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.pallete.primary004,
    borderRadius: 8,
    alignContent: 'center',
  },
  text: {
    color: theme.pallete.white,
    textAlign: 'left',
  },
});

export default AdminNotification;
