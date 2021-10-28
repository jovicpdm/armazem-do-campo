import React, {useState} from 'react';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';

const ProfileModal = ({openModal}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ProfileModal;

// const styles = StyleSheet.create({
//   modalContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
// });
