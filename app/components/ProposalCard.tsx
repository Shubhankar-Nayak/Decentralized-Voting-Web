type Proposal = {
  id: number;
  title: string;
  voteCount: number;
};

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (id: number) => void;
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold">{proposal.title}</h2>
      <p>Votes: {proposal.voteCount}</p>
      <button
        onClick={() => onVote(proposal.id)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Vote
      </button>
    </div>
  );
}
