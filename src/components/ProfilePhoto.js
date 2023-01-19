import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const ProfilePhoto = ({photo, onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.profilePhoto}
        source={{
          uri: photo,
        }}
      />
      {children}
    </TouchableOpacity>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  profilePhoto: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginLeft:5,
  },
});
