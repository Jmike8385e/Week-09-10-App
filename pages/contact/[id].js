import React, { useState } from 'react';
import {
  Heading,
  Link,
  Box,
  Flex,
  Input,
  Button,
  Text,
  Stack
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../firebase";

function contactItem({ itemData }) {
    const [inputName, setInputName] = useState(itemData.name);
    const [inputPhone, setInputPhone] = useState(itemData.phone);
    const [inputEmail, setInputEmail] = useState(itemData.email);
    const [inputAddress, setInputAddress] = useState(itemData.address);
    const [inputCity, setInputCity] = useState(itemData.city);
    const [inputState, setInputState] = useState(itemData.state);
    const [inputZip, setInputZip] = useState(itemData.zip);
    const [statusMsg, setStatusMsg] = useState('');
    const { user } = useAuth() || {};
    if (!user) {
        return;
    }
    const sendData = async () => {
        console.log("sending! ", itemData);
        const docRef = doc(db, 'contact', itemData.id);
        updateDoc(
            docRef,
            {
                name: inputName,
                phone: inputPhone,
                email: inputEmail,
                address: inputAddress,
                city: inputCity,
                state: inputState,
                zip: inputZip
            }
        ).then(
            docRef => {
                setStatusMsg("Contact Updated!");
            }
        ).catch(
            error => {
                console.log(error);
                setStatusMsg("Error!");
            }
        );
    };
    return (
        <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
            <Box mb='3'>   
            <Heading fontSize={"md"}>
                <Link href="/">Home</Link>
            </Heading>
            </Box> 
            <Box mb='3'>   
            <Text>Edit Contact</Text>
            </Box> 
            <Stack spacing={2}>
                <Input type="text" width='auto' value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Name" />
                <Input type="tel" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} placeholder="Phone" />
                <Input type="text" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email" />
                <Input type="text" value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} placeholder="Address" />
                <Input type="text" value={inputCity} onChange={(e) => setInputCity(e.target.value)} placeholder="City" />
                <Input type="text" value={inputState} onChange={(e) => setInputState(e.target.value)} placeholder="State" />
                <Input type="text" value={inputZip} onChange={(e) => setInputZip(e.target.value)} placeholder="Zip" />
                <Button
                    ml={2}
                    onClick={() => sendData()}>
                    Update
                </Button>
            </Stack>
            <Text>
                Contact last updated: {new Date(itemData.createdAt).toLocaleDateString('en-US')}
            </Text>
            <Text>
                {statusMsg}
            </Text>
        </Flex>
    );
}

export async function getServerSideProps(context) {
  let itemData = null;
  const docRef = doc(db, 'contact', context.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    itemData = {
      id: docSnap.id,
      ...docSnap.data()
    };
  }

  return {
    props: {
      itemData
    }
  };
}
export default contactItem;
