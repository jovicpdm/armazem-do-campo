import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text,  Alert } from 'react-native';
import { onValue, getDatabase, ref, update } from 'firebase/database';

import { theme } from '../global/styles/theme';
import { TextInput} from 'react-native-paper';
import SmallButton from './SmallButton';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import InputImage from './InputImage';


const UserCardItem = ({
  id, 
  name,
  email,
  address,
  photo,
  presentation, 
  phone, 
  password,
  status,
}) => {

  const [newName, setNewName] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newPresentation, setNewPresentation] = useState();
  const [newPhone, setNewPhone] = useState();
  const [newPassword, setNewPassword] = useState();
  const [statuss, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);

  const db = getDatabase();

  const dbRef = ref(db, 'status');

  const listStatus = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setStatus(dataArray);
  };

  function itemUpdated (){    
      Alert.alert("Atenção", 'Item atualizado com sucesso');
      return;
    
  }

  const updatePhoto = (id, photo) => {
    if (!photo){
      Alert.alert("Atenção",'Por favor, selecione uma imagem');
      return;
    } else {
    update(ref(db, 'users/' + id), {
      photo: photo,
    });
    itemUpdated ();
  }
  };

  const updateName = (id, name) => {
    if (!name){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao nome');
      return;
    }
    update(ref(db, 'users/' + id), {
      name: name,
    });
    itemUpdated ();
  };

  const updateEmail = (id, email) => {
    if (!email){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao e-mail');
      return;
    }
    update(ref(db, 'users/' + id), {
      email: email,
    });
    itemUpdated ();
  };

  const updateAddress = (id, address) => {
    if (!address){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao endereço');
      return;
    }
    update(ref(db, 'users/' + id), {
      address: address,
    });
    itemUpdated ();
  };

  const updatePresentation = (id, presentation) => {
    if (!presentation){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado a apresentação');
      return;
    }
    update(ref(db, 'users/' + id), {
      presentation: presentation,
    });
    itemUpdated ();
  };

  const updatePhone = (id, phone) => {
    if (!phone){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao telefone');
      return;
    }
    update(ref(db, 'users/' + id), {
      phone: phone,
    });
    itemUpdated ();
  };

  const updatePassword = (id, password) => {
    if (!password){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado a senha');
      return;
    }
    update(ref(db, 'users/' + id), {
      password: password,
    });
    itemUpdated ();
  };
  
  const updateStatus = (id, status) => {
    if (!status){
      Alert.alert("Atenção",'Por favor, selecione o status');
      return;
    }
    update(ref(db, 'users/' + id), {
      status: status,
    });
    itemUpdated ();
  };

  useEffect(() => {
    listStatus();
    return () => {
      setStatus([]); 
    };
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${photo}` }}
        />
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>

      <View style={{ marginTop: 16 }} />

      <View style={styles.containerLabel}>
        <Text style={styles.titlePicker}>
          Selecione uma nova imagem
        </Text>
        <InputImage
          name="Escolher imagem"
          style={{ marginTop: 44 }}
          onPress={() => {
            ImagePicker.launchImageLibrary(
              { includeBase64: true },
              data => {
                if (data.didCancel !== true) {
                  setNewPhoto(data.assets[0].base64);
                }
              },
            );
          }}
        />
        <SmallButton
          name="Atualizar imagem"
          type="primary"
          onPress={() => { updatePhoto(id, newPhoto) }}
        />
      </View>

      <View style={{ marginTop: 16 }} />

      <TextInput
        label={`Nome: ${name}`}
        placeholder="nome"
        onChangeText={text => setNewName(text)}
        keyboardType="default"
      />
      <SmallButton
        name="Atualizar nome"
        type="primary"
        onPress={() => { updateName(id, newName) }}
      />

      <TextInput
        label={`E-mail: ${email}`}
        placeholder="e-mail"
        onChangeText={text => setNewEmail(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="Atualizar e-mail"
        type="primary"
        onPress={() => { updateEmail(id, newEmail) }}
      />

      <TextInput
        label={`Endereço: ${address}`}
        placeholder="Endereço"
        onChangeText={text => setNewAddress(text)}
        keyboardType="default"
      />
      <SmallButton
        name="Atualizar endereço"
        type="primary"
        onPress={() => { updateAddress(id, newAddress) }}
      />

      <TextInput
        label={`Apresentação: ${presentation}`}
        placeholder="Apresentação"
        onChangeText={text => setNewPresentation(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="Atualizar apresentação"
        type="primary"
        onPress={() => { updatePresentation(id, newPresentation) }}
      />

      <TextInput
        label={`Telefone: ${phone}`}
        placeholder="Telefone"
        onChangeText={text => setNewPhone(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="Atualizar telefone"
        type="primary"
        onPress={() => { updatePhone(id, newPhone) }}
      />

      <TextInput
        label={`Senha: ${password}`}
        placeholder="Senha"
        onChangeText={text => setNewPassword(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="Atualizar senha"
        type="primary"
        onPress={() => { updatePassword(id, newPassword) }}
      />

<Text style={styles.titlePicker}> {`Status: ${status}`} </Text>
      <Picker
        dropdownIconColor={theme.pallete.primary004}
        mode="dropdown"
        style={{ color: theme.pallete.black }}
        selectedValue={selectedStatus}
        onValueChange={(itemValue, item) => setSelectedStatus(itemValue)}>
        <Picker.Item
          color={theme.pallete.black}
          label="Selecione o status"
          value={0}
        />
        {statuss.map(status => {
          return (
            <Picker.Item
              color={theme.pallete.black}
              label={status.description}
              value={status.description}
              key={status.description}
            />
          );
        })}
      </Picker>

      <SmallButton
        name="Atualizar status"
        type="primary"
        onPress={() => { updateStatus(id, selectedStatus) }}
      />


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
  titlePicker: {
    marginTop: 5,
    marginBottom: 2,
    color: theme.pallete.primary,
    fontSize: 16,
  },
  containerLabel: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default UserCardItem;
