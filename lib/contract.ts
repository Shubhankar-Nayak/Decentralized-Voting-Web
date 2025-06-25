import { ethers } from "ethers";
import VotingArtifact from "../abis/Voting.json";

const contractAddress = "0x49E50304bd1390403A356CE04e8559d61BACaDC6";

export const getVotingContract = (providerOrSigner: any) => {
  return new ethers.Contract(contractAddress, VotingArtifact.abi, providerOrSigner);
};
