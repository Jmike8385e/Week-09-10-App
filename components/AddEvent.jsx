// our first react component for our event app!
// so we can use jsx to make a component load React
import React from "react";
// now lets add a bunch of chakra ui components
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast
} from "@chakra-ui/react";
// bring in useAuth from our hooks so we can make sure use logged in for this comp
import useAuth from "../hooks/useAuth";
// bring in addEventEntry function from our api
import { addEventEntry } from "../api/event";

// now lets define a react jsx component
const AddEventInput = () => {
    // every form control (text input) we want to associate a react state
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");
    const [attendance, setAttendance] = React.useState("not attending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    // let's call useAuth()
    const { isLoggedIn, user } = useAuth() || {};
    // let's define a function to run that handles the add event operation
    const handleEventCreate = async () => {
        // are we logged in?
        if ( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "You must be logged in to create an event",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                }
            );
            return;
        }
        // if our code continues execution this far, user is logged in
        setIsLoading(true);
        // let's build a object value template
        const event = {
            title,
            date,
            attendance,
            userId: user.uid
        };
        // call our api function that should add a new doc to firestore collection
        await addEventEntry(event);
        // once we get past the previous, the firestore doc is made (or an error)
        setIsLoading(false);
        setTitle("");
        setDate("");
        setAttendance("not attending");
        // show a floaty with attendance update
        toast(
            {
                title: "Event created",
                status: "success"
            }
        );

    };
    // let's return the markup for this AddEvent JSX component
    return (
        <Box maxW='sm' margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input 
                    placeholder="Title"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea
                    placeholder="Date"
                    value={date}
                    onChange={ (e) => setDate(e.target.value) }
                />
                <Select 
                    value={attendance} 
                    onChange={ (e) => setAttendance(e.target.value) }>
                    <option 
                        value={"not attending"} 
                        style={{ color: "yellow", fontWeight: "bold" }} 
                    >
                        Not Attending
                    </option>
                    <option 
                        value={"attending"} 
                        style={{ color: "green", fontWeight: "bold" }} 
                    >
                        Attending
                    </option>
                </Select>
                <Button
                    onClick={ () => handleEventCreate() }
                    disabled={ title.length < 1 || date.length <1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Event
                </Button>
            </Stack>
        </Box>
    );
};

// don't forget to export the component function!
export default AddEventInput;
