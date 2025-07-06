type Props = {
  reason: string;
  setReason: (val: string) => void;
  onNext: () => void;
};

const options = [
  "I no longer need my account",
  "I found what I was looking for",
  "I’m switching to another platform",
  "I have privacy concerns",
  "I’m creating a new account",
  "Other",
];

export default function StepOne({ reason, setReason, onNext }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Give Us Your Feedback</h2>
      <p className="text-yellow-700 bg-yellow-100 p-3 rounded mb-4">
        Oh no! Deleting your account means missing out on great deals, exclusive
        student offers, and a trusted marketplace. Are you sure you want to
        leave?
      </p>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              checked={reason === option}
              onChange={() => setReason(option)}
              className="accent-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!reason}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
