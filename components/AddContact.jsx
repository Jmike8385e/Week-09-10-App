// our first react component for our contact app!
// so we can use jsx to make a component load React
import React from "react";
// now lets add a bunch of chakra ui components
import {
    Box,
    Input,
    Button,
    Stack,
    useToast
} from "@chakra-ui/react";
// bring in useAuth from our hooks so we can make sure use logged in for this comp
import useAuth from "../hooks/useAuth";
// bring in addContact function from our api
import { addContact } from "../api/contact";

// now lets define a react jsx component
const AddContactInput = () => {
    // every form control (text input) we want to associate a react state
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    // let's call useAuth()
    const { isLoggedIn, user } = useAuth() || {};
    // let's define a function to run that handles the add contact operation
    const handleContactCreate = async () => {
        // are we logged in?
        if ( !isLoggedIn ) {
            // show a floating alert
            toast(
                {
                    title: "You must be logged in to create a contact",
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
        const contact = {
            name,
            phone,
            email,
            address,
            city,
            zip,
            state,
            userId: user.uid
        };
        // call our api function that should add a new doc to firestore collection
        await addContact(contact);
        // once we get past the previous, the firestore doc is made (or an error)
        setIsLoading(false);
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        // show a floaty with status update
        toast(
            {
                title: "Contact created",
                status: "success"
            }
        );

    };
    // let's return the markup for this AddContact JSX component
    return (
        <Box maxW='sm' margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input 
                    placeholder="Name"
                    value={name}
                    onChange={ (e) => setName( e.target.value ) }
                />
                <Input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={ (e) => setPhone( e.target.value)  }
                />
                  <Input 
                    placeholder="Email"
                    value={email}
                    onChange={ (e) => setEmail( e.target.value ) }
                />
                <Input
                    placeholder="Address"
                    value={address}
                    onChange={ (e) => setAddress( e.target.value ) }
                />
                <Input 
                    placeholder="City"
                    value={city}
                    onChange={ (e) => setCity( e.target.value ) }
                />
                <Input
                    placeholder="State"
                    value={state}
                    onChange={ (e) => setState( e.target.value ) }
                />
                  <Input 
                    placeholder="Zip Code"
                    value={zip}
                    onChange={ (e) => setZip ( e.target.value ) }
                />
                <Button
                    onClick={ () => handleContactCreate() }
                    disabled={ name.length < 1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Contact
                </Button>
            </Stack>
        </Box>
    );
};

// don't forget to export the component function!
export default AddContactInput;
