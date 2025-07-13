import { Button } from "@/components/ui/button";
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
      <label className="flex items-start text-sm text-gray-700">
        <input
          type="checkbox"
          name="agreeToTerms"
          className="mr-2 rounded mt-0.5 text-[#54abdb] accent-[#54abdb] focus:ring-[#54abdb]"
          checked={confirmDelete}
          onChange={() => setConfirmDelete(!confirmDelete)}
          aria-label="Accept terms and conditions"
        />
        <span className="text-[13px]">
          {" "}
          I understand the consequences of deleting my account.
        </span>
      </label>

      <div className="flex justify-between mt-10 flex-col md:flex-row gap-4 ">
        <Button
          className="w-full sm:flex-1 bg-white border-2 border-[#54abdb] text-[#54abdb] hover:bg-blue-50 px-4 py-5 text-sm sm:text-base"
          onClick={onBack}
        >
          Cancel
        </Button>

        <Button
          className="w-full sm:flex-1 bg-[#54abdb] border-2 border-[#54abdb] text-white hover:bg-[#4a90d2] px-4 py-5 text-sm sm:text-base"
          disabled={!confirmDelete}
          onClick={onDelete}
        >
          Deactivate Account
        </Button>
      </div>
    </div>
  );
}
