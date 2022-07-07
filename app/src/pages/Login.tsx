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
import WalletSelectorModal from "../components/WalletSelectorModal";

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
                            Nusta Web3
                        </Heading>
                    </Flex>
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
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Login;
