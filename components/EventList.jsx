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
import { deleteEvent, toggleEventAttendance } from "../api/event";
import { doUseEffect } from "../api/use-effect";

// define the jsx component for the list
const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    // tell react to update the ui!
    doUseEffect(setEvents,"event", user);
    // build nested function to delete a event
    const handleEventDelete = async (id) => {
        if(
            confirm("Are you sure you want to delete?")
        ) {
            deleteEvent(id);
            toast(
                { 
                    title: "Event deleted successfully", 
                    status: "success" 
                }
            );
        }
    };
    // build nested function to toggle attendance
    const handleToggle = async (id, attendance) => {
        const newAttendance = attendance == "attending" ? "not attending" : "attending";
        await toggleEventAttendance(
            {
                docId: id, 
                attendance: newAttendance 
            }
        );
        toast(
            {
                title: `Event marked ${newAttendance}`,
                attendance: newAttendance == "attending" ? "success" : "warning",
            }
        );
    };
    // finally we can define the jsx for the component
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                { events &&
                  events.map(
                    (event) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key={event.id}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            <a href={"/event/" + event.id}>{event.title}</a>
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
                                onClick={ () => handleEventDelete(event.id) }
                            >
                                <FaTrash />
                            </Badge>
                            <Badge
                                color={event.attendance == "not attending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={ () => handleToggle(event.id, event.attendance) }
                            >
                                { event.attendance == "not attending" ? <FaToggleOff /> : <FaToggleOn /> }
                            </Badge>
                            <Badge
                                float="right"
                                opacity="0.8"
                                bg={ event.attendance == "not attending" ? "yellow.500" : "green.500" }
                            >
                                { event.attendance }
                            </Badge>
                        </Heading>
                        <Text>
                            { event.date }
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
export default EventList;
