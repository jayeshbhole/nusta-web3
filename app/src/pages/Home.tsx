import { Box, Grid, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Loader from "../components/Loader";
import { useMoralisQuery } from "react-moralis";
import Feed from "../components/Feed";

const Home = () => {
    useEffect(() => {
        document.title = "OnlyUwU";
    }, []);
    const {
        data: posts,
        error,
        isLoading,
    } = useMoralisQuery("Post", (query) =>
        query.descending("createdAt").limit(20)
    );
    console.log(posts, error);

    return (
        <Box>
            <Navbar />
            <Grid
                gridTemplateColumns="22vw auto"
                columnGap="2rem"
                marginLeft="1rem"
                marginRight="1rem">
                <RightSidebar />
                <Feed
                    isExplore={false}
                    isLibrary={false}
                    isYourPosts={false}
                    isSearch={false}
                    isProfile={false}
                    isFollower={false}
                    homePosts={posts}
                />
                {/* <LeftSidebar /> */}
            </Grid>
        </Box>
    );
};

export default Home;
