import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { Button, Card, Col, Grid, Text } from "@nextui-org/react";
import { ContractCard } from "../components/ContractCard";
import {
  useBanditClub,
  useBanditClubRead,
  useBanditClubRegisteredContractsCount,
  useBanditClubRegisteredContractsList,
} from "../generated";
import { BanditClub } from "../constants";
import { BigNumber } from "ethers";

const StyledUserDashboard = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #000;
    color: #fff;
    h1 {
      font-size: 1.5rem;
    }
    a {
      color: #fff;
      text-decoration: none;
      margin: 0 1rem;
    }
  }
`;

export default function UserDashboard() {
  const contracts = ["0x123", "0x456", "0x789"];

  const contract = useBanditClub({
    address: BanditClub,
  });

  const { data: totalRegisteredContracts } =
    useBanditClubRegisteredContractsCount({
      address: BanditClub,
      watch: true,
    });
  console.log("-> data", totalRegisteredContracts?.toNumber());

  //const [contracts, setContracts] = useState<string[]>([]);
  console.log("-> contracts", contracts);

  useEffect(() => {
    const handleFetchTokens = async () => {
      if (!totalRegisteredContracts || !contract) return;
      const promises = [];
      for (let i = 0; i < totalRegisteredContracts.toNumber(); i++) {
        promises.push(contract.registeredContractsList(BigNumber.from(i)));
      }
      Promise.all(promises).then((res) => {
        setContracts(res.map((r) => r));
      });
    };
    handleFetchTokens();
  }, [contract, totalRegisteredContracts]);

  return (
    <StyledUserDashboard>
      <Grid.Container gap={2} justify="center">
        {contracts.map((contract) => {
          return (
            <Grid xs={12} sm={4} key={contract}>
              <ContractCard address={contract} />
            </Grid>
          );
        })}
      </Grid.Container>
    </StyledUserDashboard>
  );
}
