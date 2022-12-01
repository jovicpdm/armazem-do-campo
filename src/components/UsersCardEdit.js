import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

import { theme } from '../global/styles/theme';
import IconMedium from './IconMedium';
import SmallButton from './SmallButton';

const UsersCardEdit = ({
  props, 
  address,
  email,
  name,
  phone,
  photo,
  presentation,
}) => {

  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false); 

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${photo}` }}
        />
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>
            {email}
          </Text>
          <Text style={styles.subtitle}>
            {address} 
          </Text>
          <Text style={styles.subtitle}>
            {presentation} 
          </Text>
          <Text style={styles.subtitle}>
            {phone} 
          </Text>
        </View>
      </View>
      {expand ? (
        <>
          <View style={{ marginTop: 16 }} />
          {showInput ? (
            <>
              
            </>
          ) : (
            <SmallButton
              name="Editar"
              type="primary"
              onPress={props}
            />
          )}
        </>
      ) : null}
       <TouchableOpacity
        style={{height: 40, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          setExpand(!expand);
        }}>
        {expand ? (
          <IconMedium name="chevron-up" />
        ) : (
          <IconMedium name="chevron-down" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 2,
    marginTop: 8,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    elevation: 1,
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowOpacity: 0.2,
    justifyContent: 'space-between',
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
  titleSubtitle: {
    flexDirection: 'column',
    marginLeft: 8,
    alignContent: 'space-around',
  },
  title: {
    color: theme.pallete.black,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  subtitle: {
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});

export default UsersCardEdit;
