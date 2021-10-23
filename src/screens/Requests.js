/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View, FlatList} from 'react-native';
import RequestCard from '../components/RequestCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import firebase from '../config/firebase';
import {getDatabase, ref, onValue} from 'firebase/database';

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const db = getDatabase();
  const dbRef = ref(db, 'users');

  const listRequests = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          let {status} = snap.val();
          if (status == 'aguardando') {
            dataArray.push(snap.val());
          }
        });
        resolve();
      });
    });
    setRequests(dataArray);
    console.log(requests);
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
