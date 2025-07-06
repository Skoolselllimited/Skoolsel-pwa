type Props = {
  confirmDelete: boolean;
  setConfirmDelete: (val: boolean) => void;
  onBack: () => void;
  onDelete: () => void;
};

export default function StepThree({
  confirmDelete,
  setConfirmDelete,
  onBack,
  onDelete,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
      <div className="mb-4 space-y-1 text-gray-700">
        <p>• Remove all your data</p>
        <p>• Cannot be undone</p>
        <p>• Lose access to your listings & purchases</p>
      </div>
      <label className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={confirmDelete}
          onChange={() => setConfirmDelete(!confirmDelete)}
          className="accent-red-600"
        />
        I understand the consequences of deleting my account.
      </label>
      <div className="flex justify-between">
        <button onClick={onBack} className="text-blue-600 hover:underline">
          Cancel
        </button>
        <button
          disabled={!confirmDelete}
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
