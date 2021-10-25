/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View, FlatList} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';

import firebase from '../config/firebase';
import RequestCard from '../components/RequestCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const db = getDatabase();
  const dbRef = ref(db, 'users');

  const listRequests = async () => {
    // setRequests([]);
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          let {status} = snap.val();
          if (status === 'aprovado') {
            const {photo, name, email, phone, presentation} = snap.val();
            let user = {
              id: snap.key,
              photo,
              name,
              email,
              phone,
              presentation,
            };
            dataArray.push(user);
          }
        });
        resolve();
      });
    });
    setRequests(dataArray);
  };

  useEffect(() => {
    listRequests();
  }, []);

  return (
    <View>
      <TopScreen>
        <TitleScreen>Solicitações</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        {/* <Button title="teste" onPress={() => listRequests()} /> */}
        {requests ? (
          <View style={{marginTop: 16}}>
            <HighlightedText>Sem solicitações</HighlightedText>
          </View>
        ) : null}
        <FlatList
          data={requests}
          renderItem={({item}) => {
            return (
              <RequestCard
                photo={item.photo}
                name={item.name}
                email={item.email}
                phone={item.phone}
                presentation={item.presentation}
                id={item.id}
              />
            );
          }}
        />
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
