import React from "react";
import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteContact, toggleContactStatus } from "../api/contact";
import { doUseEffect } from "../api/use-effect";

// define the jsx component for the list
const ContactList = () => {
    const [contacts, setContacts] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    // tell react to update the ui!
    doUseEffect(setContacts,"contact", user);
    // build nested function to delete a contact
    const handleContactDelete = async (id) => {
        if(
            confirm("Are you sure you want to delete?")
        ) {
            deleteContact(id);
            toast(
                { 
                    title: "Contact deleted successfully", 
                    status: "success" 
                }
            );
        }
    };
    // build nested function to toggle status
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleContactStatus(
            {
                docId: id, 
                status: newStatus 
            }
        );
        toast(
            {
                title: `Contact marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning",
            }
        );
    };
    // finally we can define the jsx for the component
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                { contacts &&
                  contacts.map(
                    (contact) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key={contact.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            <a href={"/contact/" + contact.id}>{contact.name}</a>
                            {" "}
                            <Badge
                                color="red.500"
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={ () => handleContactDelete(contact.id) }
                            >
                                <FaTrash />
                            </Badge>
                            
                        </Heading>
                        <Text>
                            { contact.phone }
                        </Text>
                        <Text>
                            { contact.email }
                        </Text>
                        <Text>
                            { contact.address }
                        </Text>
                        <Text>
                            { contact.city }
                        </Text>
                        <Text>
                            { contact.state }
                        </Text>
                        <Text>
                            { contact.zip }
                        </Text>
                    </Box>
                    )
                  )
                }
            </SimpleGrid>
        </Box>
    );
};

// export the component
export default ContactList;
