import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "./components/ui/color-mode"

import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.200", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Box>
  )
}

export default App;
