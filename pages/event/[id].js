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

const eventItem = ({ itemData }) => {
  const [inputTitle, setInputTitle] = useState(itemData.title);
  const [inputDate, setInputDate] = useState(itemData.date);
  const [attendanceMsg, setAttendanceMsg] = useState('');
  const { user } = useAuth() || {};
  if (!user) {
    return;
  }
  const sendData = async () => {
    console.log("sending! ", itemData);
    const docRef = doc(db, 'event', itemData.id);
    updateDoc(
      docRef, 
      {
        title: inputTitle,
        date: inputDate
      }
    ).then(
      docRef => {
        setAttendanceMsg("Event Updated!");
      }
    ).catch(
      error => {
        console.log(error);
        setAttendanceMsg("Error!");
      }
    );
  }
  return (
    <Flex flexDir="column" maxW={800} align="center" justify="start" minH="100vh" m="auto" px={4} py={3}>
      <Box mb='3'>   
          <Heading fontSize={"md"}>
              <Link href="/">Home</Link>
          </Heading>
          </Box> 
          <Box mb='3'>   
          <Text>Edit Event</Text>
      </Box> 
      <Stack>
        <Input type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Title" />
        <Input type="text" value={inputDate} onChange={(e) => setInputDate(e.target.value)} placeholder="Date" />
        <Button
          ml={2}
          onClick={() => sendData()}
        >
          Update
        </Button>
      </Stack>
      <Text>
        Current Status: {itemData.attendance}
      </Text>
      <Text>
        Event last updated: {new Date(itemData.createdAt).toLocaleDateString('en-US')}
      </Text>
      <Text>
        {attendanceMsg}
      </Text>
    </Flex>
  );
};

export async function getServerSideProps(context) {
  let itemData = null;
  const docRef = doc(db, 'event', context.params.id);
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

export default eventItem;
