import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import CreateComponent from "../components/CreateComponent";

const Create = () => {
    useEffect(() => {
        document.title = "OnlyUwU - Create post";
    }, []);
    return (
        <div>
            <Navbar />
            <Grid
                gridTemplateColumns="22vw 80ch"
                columnGap="2rem"
                marginLeft="1rem"
                marginRight="1rem">
                <RightSidebar />
                <CreateComponent />
            </Grid>
        </div>
    );
};

export default Create;
