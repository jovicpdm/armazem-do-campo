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
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: 60,
  },
});
