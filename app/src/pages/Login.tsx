import {
    Button,
    Flex,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";
import { connectors } from "../components/utils/connectorConfig";

const Login = () => {
    const { isOpen: isWalletSelectorOpen, onToggle: toggleWalletSelector } =
        useDisclosure();
    useEffect(() => {
        document.title = "OnlyUwU - Login";
    }, []);
    const { isAuthenticating } = useMoralis();

    return (
        <Flex
            overflow="hidden"
            flexDirection="column"
            height="100vh"
            width="100vw">
            <WalletSelectorModal
                isWalletSelectorOpen={isWalletSelectorOpen}
                toggleWalletSelector={toggleWalletSelector}
            />
            <LoginNavbar />
            <Flex
                justifyContent="center"
                alignItems="center"
                width="100vw"
                height="73vh"
                overflow="hidden">
                <Flex flexDirection="column" gap="1.4rem">
                    <Flex flexDirection="column" alignItems="center">
                        <Heading as="h4" size="xl">
                            Make friends with
                        </Heading>
                        <Heading as="h4" size="xl">
                            OnlyUwU - Web3
                        </Heading>
                    </Flex>
                    <Tooltip label="Get started" openDelay={400}>
                        <Button
                            isLoading={isAuthenticating}
                            leftIcon={<AiOutlineFire />}
                            colorScheme="purple"
                            variant="solid"
                            borderRadius={24}
                            size="lg"
                            onClick={toggleWalletSelector}>
                            Get started
                        </Button>
                    </Tooltip>
                </Flex>
            </Flex>
        </Flex>
    );
};
interface WalletSelectorModalProps {
    isWalletSelectorOpen: boolean;
    toggleWalletSelector: () => void;
}
const WalletSelectorModal = ({
    isWalletSelectorOpen,
    toggleWalletSelector,
}: WalletSelectorModalProps) => {
    const navigate = useNavigate();
    const toast = useToast();
    const { authenticate } = useMoralis();

    const login = async (connectorId: any) => {
        try {
            await authenticate({ provider: connectorId, chainId: 137 }).then(
                (user) => {
                    if (!user?.get("bio")) {
                        user?.set("bio", "I Love Web3 Only-UwU");
                        user?.save()
                            .then(() => navigate("/"))
                            .catch((err) => {
                                toast({
                                    title: "Error",
                                    description: err?.message,
                                    status: "error",
                                    duration: 6900,
                                    isClosable: true,
                                });
                            });
                    }
                }
            );
            window.localStorage.setItem("connectorId", connectorId);
            toggleWalletSelector();
        } catch (e: any) {
            toast({
                title: "Error",
                description: e?.message,
                status: "error",
                duration: 6900,
                isClosable: true,
            });
        }
    };

    return (
        <Modal
            isOpen={isWalletSelectorOpen}
            onClose={toggleWalletSelector}
            size="md"
            isCentered
            blockScrollOnMount>
            <ModalOverlay />
            <ModalContent
                background={useColorModeValue("white", "bg.dark.900")}
                borderWidth="1px"
                borderColor={useColorModeValue("gray.200", "blue.700")}
                borderRadius="xl">
                <ModalHeader textAlign={"center"} fontSize="2xl">
                    Connect Wallet
                </ModalHeader>

                <ModalBody py="4" pb="8" px={{ md: "6", sm: "0" }}>
                    <Flex wrap="wrap" justify="space-between" gap="4">
                        {connectors.map(({ title, icon, connectorId }, key) => (
                            <Button
                                w="17ch"
                                h="20"
                                p="4"
                                variant="outline"
                                leftIcon={
                                    <Image
                                        src={icon}
                                        alt={title + connectorId}
                                        boxSize="30"
                                    />
                                }
                                key={key}
                                onClick={() => login(connectorId)}>
                                <Text as="span" fontWeight={400} fontSize="md">
                                    {title}
                                </Text>
                            </Button>
                        ))}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default Login;
