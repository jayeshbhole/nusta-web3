import { useEffect, useState, useRef, ChangeEvent } from "react";
import {
    Flex,
    Heading,
    Avatar,
    IconButton,
    Image,
    Tooltip,
    Button,
    useDisclosure,
    useToast,
    Input,
    SkeletonCircle,
    Skeleton,
    Radio,
    useColorMode,
} from "@chakra-ui/react";
import {
    BiDotsVerticalRounded,
    BiCommentDetail,
    BiEdit,
    BiTrash,
} from "react-icons/bi";
import {
    BsHeart,
    BsBookmark,
    BsHeartFill,
    BsBookmarkFill,
} from "react-icons/bs";
import { MdOutlineReportProblem } from "react-icons/md";
import { format } from "timeago.js";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { Post as PostType, PostAttributes } from "../types";

type Props = {
    post?: PostAttributes;
};

const Post = ({ post }: Props) => {
    const { user } = useMoralis();

    const {
        isOpen: isCommentOpen,
        onOpen: onCommentOpen,
        onClose: onCommentClose,
    } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
    } = useDisclosure();
    const cancelRef = useRef();

    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const [caption, setCaption] = useState(post?.attributes?.caption);
    const [image, setImage] = useState(post?.attributes?.imageURL);
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setImageUrl(URL.createObjectURL(e?.target?.files[0]));
        //@ts-ignore
        setImage(e?.target?.files[0]);
    };
    const [loadyboi, setLoadyboi] = useState(true);

    const [likes, setLikes] = useState([]);

    const { colorMode } = useColorMode();
    const [comment, setComment] = useState("");

    const updatePost = () => {};
    const deletePost = () => {};
    return (
        <Flex
            flexDirection="column"
            padding="1rem"
            width="100%"
            boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
            borderRadius="md"
            gap="1rem"
            marginBottom="0.7rem">
            <Flex flexDirection="row" width="100%" alignItems="center">
                <Tooltip label={post?.attributes?.userAddress} openDelay={200}>
                    {loadyboi ? (
                        <SkeletonCircle
                            borderRadius={"100%"}
                            height="12"
                            width="14"
                        />
                    ) : (
                        <Avatar
                            cursor="pointer"
                            onClick={() => {
                                navigate(
                                    "/profile/" + post?.attributes?.userAddress
                                );
                            }}
                        />
                    )}
                </Tooltip>
                <Flex
                    flexDirection="column"
                    width="100%"
                    marginLeft="1rem"
                    gap="0.2rem">
                    {loadyboi ? (
                        <Skeleton width="20rem" height="1rem" />
                    ) : (
                        <Heading as="h3" size="md">
                            {post?.attributes?.userAddress}
                        </Heading>
                    )}
                    {loadyboi ? (
                        <Skeleton width="15rem" height="1rem" />
                    ) : (
                        <Heading as="h4" size="sm" color="gray.600">
                            {format(post?.createdAt)}
                        </Heading>
                    )}
                </Flex>
                {post?.attributes?.userAddress === user?.id ? (
                    <Menu>
                        <MenuButton>
                            <IconButton
                                icon={<BiDotsVerticalRounded size="1.6rem" />}
                                aria-label="Shit"
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem gap="0.5rem" onClick={onEditOpen}>
                                <BiEdit size={20} color="#90CDF4" />
                                <Heading as="h4" size="sm" color="#90CDF4">
                                    Edit
                                </Heading>
                            </MenuItem>
                            <MenuItem gap="0.5rem" onClick={onOpen}>
                                <BiTrash size={20} color="red" />
                                <Heading as="h4" size="sm" color="red">
                                    Delete
                                </Heading>
                            </MenuItem>
                        </MenuList>
                        {/* edit modal stuff */}
                        <Modal isOpen={isEditOpen} onClose={onEditClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Update Post</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex
                                        width="100%"
                                        gap="1rem"
                                        flexDirection="column">
                                        <Input
                                            variant="filled"
                                            placeholder="Caption"
                                            value={caption}
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setCaption(e?.target?.value);
                                            }}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            placeholder="Select post image"
                                            onChange={uploadImage}
                                        />
                                    </Flex>
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt=""
                                            width="100%"
                                        />
                                    ) : (
                                        <Image
                                            src={image}
                                            alt=""
                                            width="100%"
                                        />
                                    )}
                                </ModalBody>
                                {/* update post */}
                                {/* <ModalFooter>
                                    <Button mr={3} onClick={onEditClose}>
                                        Close
                                    </Button>
                                    {caption?.length >= 5 &&
                                    caption?.length <= 100 &&
                                    image !== "" ? (
                                        <Button
                                            onClick={updatePost}
                                            isLoading={updateLoading}>
                                            Update
                                        </Button>
                                    ) : (
                                        <Button disabled>Update</Button>
                                    )}
                                </ModalFooter> */}
                            </ModalContent>
                        </Modal>
                        {/* delete alert dialog stuff here */}
                        <AlertDialog
                            isOpen={isOpen}
                            //@ts-ignore
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}>
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader
                                        fontSize="lg"
                                        fontWeight="bold">
                                        Delete Post
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can't undo this action
                                        afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        {loading === true ? (
                                            ""
                                        ) : (
                                            <Button
                                                //@ts-ignore
                                                ref={cancelRef}
                                                onClick={onClose}>
                                                Cancel
                                            </Button>
                                        )}
                                        <Button
                                            colorScheme="red"
                                            onClick={deletePost}
                                            ml={3}
                                            isLoading={loading}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Menu>
                ) : (
                    <></>
                )}
            </Flex>
            {loadyboi ? <Skeleton width="100%" height="20rem" /> : ""}
            <Image
                src={
                    post?.attributes?.imageURL?.includes("https")
                        ? post?.attributes?.imageURL
                        : "/ohno.png"
                }
                alt=""
                borderRadius="lg"
                onLoad={() => {
                    setLoadyboi(false);
                }}
            />
            {loadyboi ? (
                <Skeleton height="1rem" width="24rem" />
            ) : (
                <Heading as="h5" size="sm">
                    {post?.attributes?.caption}
                </Heading>
            )}
            <Flex alignItems="center" justifyContent="space-between">
                <Flex gap="1.3rem">
                    {/* <Flex alignItems="center" gap="0.4rem">
                        <IconButton
                            aria-label="Like"
                            isRound={true}
                            onClick={likePost}>
                            {loadyboi ? (
                                <SkeletonCircle />
                            ) : liked ? (
                                <BsHeartFill size="1.5rem" cursor="pointer" />
                            ) : (
                                <BsHeart size="1.5rem" cursor="pointer" />
                            )}
                        </IconButton>
                        <Heading as="h5" size="sm" color="gray.600">
                            {likes?.length}
                        </Heading>
                    </Flex> */}
                    {/* <Flex alignItems="center" gap="0.4rem">
                        <IconButton
                            aria-label="Comment"
                            isRound={true}
                            onClick={onCommentOpen}>
                            {loadyboi ? (
                                <SkeletonCircle />
                            ) : (
                                <BiCommentDetail
                                    size="1.5rem"
                                    cursor="pointer"
                                />
                            )}
                        </IconButton>
                        <Heading as="h5" size="sm" color="gray.600">
                            {comments?.length}
                        </Heading>
                    </Flex> */}
                </Flex>
            </Flex>
            {loadyboi ? (
                <Skeleton height="1rem" width="16rem" />
            ) : (
                <Heading
                    onClick={onCommentOpen}
                    as="h5"
                    size="sm"
                    color="gray.500"
                    cursor="pointer"
                    _hover={{
                        textDecorationLine: "underline",
                    }}>
                    View all comments
                </Heading>
            )}
            {/* comment modal open here */}
            {/* <Drawer
                isOpen={isCommentOpen}
                placement="right"
                onClose={onCommentClose}
                size="full">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Comments</DrawerHeader>
                    <DrawerBody>
                        {comments?.map((comment: CommentType) => (
                            <Flex
                                width="100%"
                                gap="0.6rem"
                                cursor="pointer"
                                _hover={{
                                    backgroundColor:
                                        colorMode === "light"
                                            ? "#efefef"
                                            : "#20242a",
                                }}
                                padding="1rem"
                                onClick={() => {
                                    navigate("/profile/" + comment?.userAddress);
                                }}>
                                <Avatar src={comment?.userPfp} />
                                <Flex
                                    flexDirection="column"
                                    gap="0.6rem"
                                    alignItems="start">
                                    <Heading as="h5" size="md">
                                        {comment?.userAddress}
                                    </Heading>
                                    <Heading as="h5" size="sm" color="gray.400">
                                        {comment?.comment}
                                    </Heading>
                                </Flex>
                            </Flex>
                        ))}
                    </DrawerBody>
                    <DrawerFooter gap="1rem" alignItems="center">
                        <Tooltip
                            label={auth?.currentUser?.displayName}
                            openDelay={200}>
                            <Avatar
                                src={
                                    auth?.currentUser?.photoURL as
                                        | string
                                        | undefined
                                }
                                cursor="pointer"
                            />
                        </Tooltip>
                        <Input
                            placeholder="Type here..."
                            onChange={(
                                e: ChangeEvent<HTMLInputElement>
                            ) => {
                                setComment(e?.target?.value);
                            }}
                            value={comment}
                        />
                        {comment?.length > 0 && comment?.length <= 100 ? (
                            <Button onClick={commentBoi}>Send</Button>
                        ) : (
                            <Button disabled isLoading={commentLoading}>
                                Send
                            </Button>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer> */}
        </Flex>
    );
};

export default Post;
