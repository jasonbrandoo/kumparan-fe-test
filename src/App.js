import "./App.css";
import React from "react";
import Posts from "./features/post/Posts";
import { Box, Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import { menuSelector } from "./features/menu/menuSlice";
import Users from "./features/user/Users";
import Albums from "./features/album/Albums";

function App() {
  const active = useSelector(menuSelector);
  const variant = useBreakpointValue({ base: "drawer", md: "sidebar" });

  const validateMenu = () => {
    switch (active) {
      case "users":
        return <Users />;
      case "posts":
        return <Posts />;
      case "albums":
        return <Albums />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Flex>
        <Sidebar variant={variant} />
        <Box flex="1">{validateMenu()}</Box>
      </Flex>
    </div>
  );
}

export default App;
