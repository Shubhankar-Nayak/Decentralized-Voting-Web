import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import type { Voting } from "../typechain-types/Voting";

describe("Voting", function () {
  async function deployVotingFixture() {
    const [admin, voter1, voter2] = await hre.ethers.getSigners();
    const proposalTitles = ["Proposal A", "Proposal B", "Proposal C"];

    const VotingFactory = await hre.ethers.getContractFactory("Voting");
    const voting = (await VotingFactory.deploy(proposalTitles)) as Voting;


    return { voting, admin, voter1, voter2, proposalTitles };
  }

  describe("Deployment", function () {
    it("Should set the correct admin", async function () {
      const { voting, admin } = await loadFixture(deployVotingFixture);
      expect(await voting.admin()).to.equal(admin.address);
    });

    it("Should create the proposals correctly", async function () {
      const { voting, proposalTitles } = await loadFixture(deployVotingFixture);
      for (let i = 0; i < proposalTitles.length; i++) {
        const proposal = await voting.proposals(i);
        expect(proposal.title).to.equal(proposalTitles[i]);
        expect(proposal.voteCount).to.equal(0);
      }
    });
  });

  describe("Voting", function () {
    it("Should allow a user to vote", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.connect(voter1).vote(1);
      const proposal = await voting.proposals(1);
      expect(proposal.voteCount).to.equal(1);
      expect(await voting.hasVoted(voter1.address)).to.equal(true);
    });

    it("Should prevent double voting", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.connect(voter1).vote(0);
      await expect(voting.connect(voter1).vote(1)).to.be.revertedWith("Already voted");
    });

    it("Should revert if voting for an invalid proposal", async function () {
      const { voting, voter1, proposalTitles } = await loadFixture(deployVotingFixture);
      const invalidId = proposalTitles.length; // out of range
      await expect(voting.connect(voter1).vote(invalidId)).to.be.revertedWith("Invalid proposal");
    });
  });
});
