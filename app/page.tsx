"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getVotingContract } from "../lib/contract";
import { ProposalCard } from "./components/ProposalCard";
import type { MetaMaskInpageProvider } from "@metamask/providers";

interface Proposal {
  id: number;
  title: string;
  voteCount: number;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface OnChainProposal {
  id: number;
  title: string;
  voteCount: string; 
}


export default function HomePage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await browserProvider.getSigner();
        setProvider(browserProvider);
        setSigner(signer);
        fetchProposals(browserProvider);
      }
    };
    init();
  }, []);

  const fetchProposals = async (provider: ethers.BrowserProvider) => {
    setLoading(true);
    const contract = getVotingContract(provider);
    const onChainProposals = await contract.getProposals();
    const formatted = onChainProposals.map((p: OnChainProposal) => ({
      id: p.id,
      title: p.title,
      voteCount: Number(p.voteCount),
    }));
    setProposals(formatted);
    setLoading(false);
  };

  const vote = async (proposalId: number) => {
    if (!signer) return;
    try {
      const contract = getVotingContract(signer);
      const tx = await contract.vote(proposalId);
      await tx.wait();
      alert("Vote successful!");
      fetchProposals(provider!);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Voting DApp</h1>

      {loading ? (
        <p>Loading proposals...</p>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} onVote={vote} />
          ))}
        </div>
      )}
    </main>
  );
}
