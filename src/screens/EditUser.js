import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import UserCardItem from '../components/UserCardItem';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteArea from '../components/WhiteArea';
import Logo from '../components/Logo';


export default function EditUser({ navigation, route }) {

    const db = getDatabase();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const searchUser = async () => {
        setLoading(true);
        let data = {};
        const dbRef = ref(db, 'users/' + route.params.id);

        await new Promise(resolve => {
            onValue(dbRef, snapshot => {
                const { name, email, address, photo, presentation, phone, password,status } = snapshot.val();
                data = {
                    id: snapshot.key,
                    name: name,
                    email: email,
                    address: address,
                    photo: photo,
                    presentation: presentation,
                    phone: phone,
                    password: password,
                    status: status
                };
                resolve();
                setUser(data);

            });
        });
        setLoading(false);
    };

    useEffect(() => {
        searchUser();
        return () => {
            setUser({}); 
            setLoading(false);
          };
    }, []);


    return (
        <>
        <Logo/>
            <TopScreen>
                <TitleScreen>Editar colaborador</TitleScreen>
            </TopScreen>
            <WhiteArea>

                <>
                    <UserCardItem               
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        address={user.address}
                        photo={user.photo}
                        presentation={user.presentation} 
                        phone={user.phone}  
                        password={user.password} 
                        status={user.status}                       
                    />
                </>
            </WhiteArea>
        </>
    );
}