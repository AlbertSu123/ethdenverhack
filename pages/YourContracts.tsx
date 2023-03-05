import React from "react";
import { Grid } from "@nextui-org/react";
import { ContractCard } from "../components/ContractCard";
import styled from "styled-components";
import RegisterContract from "../components/RegisterContract";
import { YourContractCard } from "../components/YourContractCard";

const StyledUserContracts = styled.div`
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

  .contracts {
    min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

function YourContracts() {
  const contracts = ["0x123", "0x456", "0x789"];

  return (
    <StyledUserContracts>
      <div className={"contracts"}>
        <Grid.Container gap={2} justify="center">
          {contracts.map((contract) => {
            return (
              <Grid xs={12} sm={4} key={contract}>
                <YourContractCard address={contract} />
              </Grid>
            );
          })}
        </Grid.Container>
      </div>
      <RegisterContract />
    </StyledUserContracts>
  );
}

export default YourContracts;
