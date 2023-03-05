import { Button, Card, Col, Row, Text } from "@nextui-org/react";
import {
  useBanditClubSubscribe,
  usePrepareBanditClubSubscribe,
} from "../generated";
import { BanditClub } from "../constants";
import { useAccount, useWaitForTransaction } from "wagmi";
import { BigNumber } from "ethers";
import RegisterContract from "./RegisterContract";
import React from "react";

export function ContractCard({ address }: { address: string }) {
  const { address: userAddress, isConnected } = useAccount();

  const { config: SubscribeConfig } = usePrepareBanditClubSubscribe({
    address: BanditClub,
    args: [userAddress!],
    enabled: isConnected,
  });

  const { data, write } = useBanditClubSubscribe(SubscribeConfig);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Contract
          </Text>
          <Text h3 color="black">
            {address}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://nextui.org/images/card-example-6.jpeg"
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          flat
          size={"lg"}
          rounded
          color="secondary"
          onClick={() => {
            write?.();
          }}
          disabled={!write || isLoading}
        >
          <Text
            css={{ color: "inherit" }}
            size={12}
            weight="bold"
            transform="uppercase"
          >
            Subscribe
          </Text>
        </Button>
        {isSuccess && (
          <div>
            Successfully subscribed!
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
}
