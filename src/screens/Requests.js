import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';

import RequestCard from '../components/RequestCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';
import GrayTextCenter from '../components/GrayTextCenter';


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
            const {photo, name, email, address, phone, presentation} = snap.val();
            let user = {
              id: snap.key,
              photo,
              name,
              email,
              address,
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
    setInterval(() => {listRequests()}, 2000);
    return () => {
      setRequests([]); 
    };
  }, [])


  return (
    <>
    <Logo/>
      <TopScreen>
        <TitleScreen>Solicitações</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>

       {requests.length === 0 ? <GrayTextCenter>Sem solicitações</GrayTextCenter> : null}
       
        <FlatList
          data={requests}
          renderItem={({item}) => {
            return (
              <RequestCard
                photo={`data:image/gif;base64,${item.photo}`}
                name={item.name}
                email={item.email}
                phone={item.phone}
                presentation={item.presentation}
                address={item.address}
                id={item.id}
              />
            );
          }}
        />
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
