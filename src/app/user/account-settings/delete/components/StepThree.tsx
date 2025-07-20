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
          className="h-[48px]  w-full lg-md:w-[140px] bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
          disabled={!confirmDelete}
          onClick={onDelete}
        >
          Deactivate Account
        </Button>
        <Button
          variant="outline"
          onClick={onBack}
          className=" h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
