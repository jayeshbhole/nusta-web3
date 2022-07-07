import {
    Button,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineFire } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useMoralis } from "react-moralis";
import WalletSelectorModal from "./WalletSelectorModal";

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
                    Nusta Web3
                </Heading>
            </Flex>

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

            {colorMode === "light" ? (
                <IconButton
                    icon={<FaMoon />}
                    aria-label="Dark mode"
                    onClick={() => {
                        toggleColorMode();
                    }}
                />
            ) : (
                <IconButton
                    icon={<FaSun />}
                    aria-label="Light mode"
                    onClick={() => {
                        toggleColorMode();
                    }}
                />
            )}

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
        </Flex>
    );
};

export default LoginNavbar;
