// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Default proposals for the voting contract
const DEFAULT_PROPOSALS = ["Alice", "Bob", "Charlie", "Diana", "Edward"];

const VotingModule = buildModule("VotingModule", (m) => {
  // Getting the proposal titles parameter (defaults to the DEFAULT_PROPOSALS array)
  const proposalTitles = m.getParameter("proposalTitles", DEFAULT_PROPOSALS);

  // Deploying the Voting contract with the proposal titles
  const votingContract = m.contract("Voting", [proposalTitles]);

  return { votingContract };
});

export default VotingModule;
