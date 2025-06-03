import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1250px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{ base: "column", sm: "row" }}>
            <Text textStyle="2xl" textTransform={"uppercase"} textAlign={"center"} fontWeight="bold" color={useColorModeValue("black", "red")}>
                <Link to="/">𓃦 Awoo Werewolf</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar;