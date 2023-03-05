// components/layout.js

import { Button, Link, Navbar, Text } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

// @ts-ignore
export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState();

  const handleChangeTab = (i) => {
    setActiveTab(i);
  };

  return (
    <>
      <Navbar isBordered={"true"} variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Bandit Club 🤑
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link
            onClick={() => handleChangeTab(0)}
            isActive={activeTab === 0}
            href="/"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            onClick={() => handleChangeTab(1)}
            isActive={activeTab === 1}
            href="YourContracts"
          >
            Your Contracts
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <ConnectButton />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>{" "}
      <main>{children}</main>
    </>
  );
}
