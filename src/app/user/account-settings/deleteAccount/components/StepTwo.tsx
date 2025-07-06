type Props = {
  details: string;
  setDetails: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepTwo({
  details,
  setDetails,
  onNext,
  onBack,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tell us more (optional)</h2>
      <textarea
        placeholder="Please share your reason. Tell us more"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full border rounded p-2 min-h-[100px]"
      />
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="text-blue-600 hover:underline">
          Cancel
        </button>
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
