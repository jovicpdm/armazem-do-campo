import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { getDatabase, ref, onValue} from 'firebase/database';
import UsersCardEdit from '../components/UsersCardEdit';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';

export default function EditUsers({ navigation }) {

    const db = getDatabase();

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);

    const listUsers = async () => {
        setLoading(true);
        const dbRef = ref(db, 'users');
        const dataArray = [];
        await new Promise(resolve => {
            onValue(dbRef, snapshot => {
                snapshot.forEach(snap => {
                    dataArray.push(snap.val());
                });
                resolve();
            });
        })
            .then(() => {
                
            })
            .catch(e => {
                console.log(e);
            });
        setUsers(dataArray);
        setLoading(false);
    };

    useEffect(() => {
        listUsers();
        return () => {
            setUsers({}); 
            setLoading(false);
          };
    }, []);


    return (
        <>
        <Logo/>
            <TopScreen>
                <TitleScreen>Atualizar colaboradores</TitleScreen>
            </TopScreen>
            <WhiteAreaWithoutScrollView>

                {!loading ? (
                    <FlatList
                        data={users}
                        key={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <UsersCardEdit
                                        id={item.id}
                                        address={item.address}
                                        email={item.email}
                                        name={item.name}
                                        phone={item.phone}
                                        photo={item.photo}
                                        presentation={item.presentation}
                                        props={() => {
                                            navigation.navigate('EditUser', {
                                                id: item.id
                                            });  
                                        }}
                                    />
                                </>
                            );
                        }}
                    />
                ) : (
                    <ActivityIndicator size={48} />
                )}

            </WhiteAreaWithoutScrollView>
        </>
    );
}

const styles = StyleSheet.create({});