import {
    Button,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Tooltip,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { AiOutlineFire } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { connectors } from "./utils/connectorConfig.js";

const LoginNavbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isWalletSelectorOpen, onToggle: toggleWalletSelector } =
        useDisclosure();
    const { user, account, isAuthenticating, isAuthenticated } = useMoralis();

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            p={4}
            position="sticky"
            top={0}
            zIndex="100"
            backgroundColor={colorMode === "light" ? "#ffffff" : "#1a202c"}>
            <WalletSelectorModal
                isWalletSelectorOpen={isWalletSelectorOpen}
                toggleWalletSelector={toggleWalletSelector}
            />
            <Flex>
                <Heading
                    color={colorMode === "light" ? "black" : "white"}
                    size="xl"
                    fontFamily="Sansita Swashed">
                    OnlyUwU
                </Heading>
            </Flex>
            <Tooltip label="Search shit" openDelay={400}>
                <InputGroup mx={8} width="50vw">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<ImSearch color="gray.300" />}
                    />
                    <Input
                        type="text"
                        placeholder="Search shit ..."
                        variant="filled"
                    />
                </InputGroup>
            </Tooltip>
            {colorMode === "light" ? (
                <Tooltip label="Dark mode" openDelay={400}>
                    <IconButton
                        icon={<FaMoon />}
                        aria-label="Dark mode"
                        onClick={() => {
                            toggleColorMode();
                        }}
                    />
                </Tooltip>
            ) : (
                <Tooltip label="Light mode" openDelay={400}>
                    <IconButton
                        icon={<FaSun />}
                        aria-label="Light mode"
                        onClick={() => {
                            toggleColorMode();
                        }}
                    />
                </Tooltip>
            )}
            <Tooltip label="Get started" openDelay={400}>
                <Button
                    isLoading={isAuthenticating}
                    leftIcon={<AiOutlineFire />}
                    colorScheme="purple"
                    variant="solid"
                    borderRadius={24}
                    padding={6}
                    onClick={toggleWalletSelector}>
                    Get started
                </Button>
            </Tooltip>
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

export default LoginNavbar;
