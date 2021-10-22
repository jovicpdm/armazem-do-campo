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
        color={theme.pallete.primary004}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: theme.pallete.primary004,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    color: theme.pallete.primary004,
    textAlign: 'left',
  },
});

export default AdminNotification;
