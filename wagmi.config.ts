import { defineConfig } from "@wagmi/cli";
import BanditClubABI from "./abi/BanditClub.abi.json";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "./generated.ts",
  contracts: [
    {
      name: "BanditClub",
      abi: BanditClubABI as any,
    },
  ],
  plugins: [react()],
});
