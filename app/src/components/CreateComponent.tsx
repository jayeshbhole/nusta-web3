import React, { useState } from "react";
import {
    Flex,
    Heading,
    Image,
    Input,
    Button,
    useToast,
} from "@chakra-ui/react";
import { BsImageFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useMoralis, useMoralisFile, useNewMoralisObject } from "react-moralis";

const CreateComponent = () => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(new File([], ""));
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setImageUrl(URL.createObjectURL(e?.target?.files[0]));
        //@ts-ignore
        setImage(e?.target?.files[0]);
    };
    const toast = useToast();

    const { account } = useMoralis();

    const { error: ipfsError, saveFile, moralisFile } = useMoralisFile();
    const { isSaving, error, save } = useNewMoralisObject("Post");

    const [loading, setLoading] = useState(false);
    const createPost = async () => {
        setLoading(true);

        await saveFile("image", image, {
            metadata: { createdBy: account ?? "" },
            type: "image/jpeg",
            saveIPFS: true,
        }).then(async (res) => {
            toast({
                title: "Uploaded to IPFS. Creating Post",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            // @ts-ignore
            console.log(res?.ipfs(), res);

            await save({
                imageURL: res?._url,
                caption: caption,
                userAddress: account ?? "",
                // @ts-ignore
                ipfs: res?.ipfs(),
            })
                .then((res) => {
                    toast({
                        title: "Post created!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                })
                .catch((e) => {
                    toast({
                        title: "Error creating post",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                });
            navigate("/");
        });
    };
    return (
        <Flex
            flexDirection="column"
            gap="2rem"
            width="100%"
            height="max-content">
            <Heading as="h4" size="md">
                Create Post
            </Heading>
            <Flex flexDirection="column" gap="0.4rem" width="100%">
                <Input
                    variant="filled"
                    placeholder="Caption"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCaption(e.target.value);
                    }}
                    value={caption}
                />
                {caption.length >= 5 && caption.length <= 100 ? (
                    ""
                ) : (
                    <Heading as="h4" size="sm" color="gray.500">
                        Caption must be between 5 to 100 letters
                    </Heading>
                )}
            </Flex>
            <Flex flexDirection="column" gap="0.4rem" width="100%">
                <input
                    type="file"
                    accept="image/*"
                    placeholder="Select post image"
                    onChange={uploadImage}
                />
                {imageUrl !== "" ? (
                    <Image src={imageUrl} alt="" width="100%" />
                ) : (
                    <>
                        <Flex alignItems="center" gap="1rem">
                            <BsImageFill size="50%" />
                        </Flex>
                        <Heading as="h4" size="sm" color="gray.500">
                            Image is required
                        </Heading>
                    </>
                )}
            </Flex>
            {caption.length >= 5 && caption.length <= 100 && imageUrl !== "" ? (
                <Button
                    colorScheme="purple"
                    marginBottom="1rem"
                    onClick={createPost}
                    isLoading={loading}
                    loadingText="Creating">
                    Create post
                </Button>
            ) : (
                <Button colorScheme="purple" marginBottom="1rem" disabled>
                    Create post
                </Button>
            )}
        </Flex>
    );
};

export default CreateComponent;
