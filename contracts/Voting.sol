// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    struct Proposal {
        uint id;
        string title;
        uint voteCount;
    }

    address public admin;
    mapping(address => bool) public hasVoted;
    Proposal[] public proposals;

    constructor(string[] memory _proposalTitles) {
        admin = msg.sender;
        for (uint i = 0; i < _proposalTitles.length; i++) {
            proposals.push(Proposal(i, _proposalTitles[i], 0));
        }
    }

    function vote(uint proposalId) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(proposalId < proposals.length, "Invalid proposal");
        hasVoted[msg.sender] = true;
        proposals[proposalId].voteCount += 1;
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }
}
