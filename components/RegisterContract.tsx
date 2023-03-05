import React from "react";
import {
  useBanditClubRegisterContract,
  usePrepareBanditClubRegisterContract,
} from "../generated";
import { useAccount, useWaitForTransaction } from "wagmi";
import { BanditClub } from "../constants";

function RegisterContract() {
  const [contractAddress, setContractAddress] = React.useState<`0x${string}`>(
    "" as `0x${string}`
  );

  const { address, isConnected } = useAccount();
  console.log("-> address", address);
  /*    { name: 'cntrct', internalType: 'address', type: 'address' },
    { name: 'feeRecipient', internalType: 'address', type: 'address' },*/
  const { config: RegisterConfig } = usePrepareBanditClubRegisterContract({
    address: BanditClub,
    args: [contractAddress, address!],
    enabled: isConnected,
  });
  console.log("-> config", RegisterConfig);

  const { data, write } = useBanditClubRegisterContract(RegisterConfig);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      <label htmlFor="address">Contact Address</label>
      <input
        id="address"
        placeholder="0x123..."
        onChange={(e) => setContractAddress(e.target.value as `0x${string}`)}
        value={contractAddress}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {isSuccess && (
        <div>
          Successfully registered your contract!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}

export default RegisterContract;
