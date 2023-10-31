// note from Ethan: import '@/' not working properly in replit workspaces

import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddEventInput from "../components/AddEvent";

export default function AddEvent() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddEventInput/>
        </Container>
    );
}