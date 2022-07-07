import {
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { connectors } from "./utils/connectorConfig.js";

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
        } catch (e) {
            toast({
                title: "Error",
                // @ts-ignore
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
                background={useColorModeValue("white", "gray.900")}
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

export default WalletSelectorModal;
