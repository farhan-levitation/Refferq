import { FormData } from "../CampaignForm";

type RewardsStepProps = {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function RewardsStep({ formData, onChange }: RewardsStepProps) {
  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "both" | "referrer" | "referred";
    onChange({
      target: {
        name: "rewardRecipients",
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleRewardTypeChange = (
    type: "referrer" | "referred",
    value: string
  ) => {
    onChange({
      target: {
        name: `${type}RewardType`,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleRewardValueChange = (
    type: "referrer" | "referred",
    value: string
  ) => {
    onChange({
      target: {
        name: `${type}RewardValue`,
        value: parseFloat(value) || 0,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Rewards</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Who gets rewards?
          </h3>
          <div className="space-y-2">
            {[
              { id: "both", label: "Both referrer and referred user" },
              { id: "referrer", label: "Only referrer" },
              { id: "referred", label: "Only referred user" },
            ].map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  id={`recipient-${option.id}`}
                  name="rewardRecipients"
                  type="radio"
                  value={option.id}
                  checked={formData.rewardRecipients === option.id}
                  onChange={handleRecipientChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor={`recipient-${option.id}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {(formData.rewardRecipients === "both" ||
          formData.rewardRecipients === "referrer") && (
          <div className="space-y-2 p-2 border rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">
              Rewards for referrer
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="referrer-fixed"
                  name="referrerRewardType"
                  type="radio"
                  value="fixed"
                  checked={formData.referrerRewardType === "fixed"}
                  onChange={() => handleRewardTypeChange("referrer", "fixed")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="referrer-fixed"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Fixed
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="referrer-percentage"
                  name="referrerRewardType"
                  type="radio"
                  value="percentage"
                  checked={formData.referrerRewardType === "percentage"}
                  onChange={() =>
                    handleRewardTypeChange("referrer", "percentage")
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="referrer-percentage"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Percentage %
                </label>
              </div>
            </div>
            <div>
              <input
                type="number"
                min="0"
                step={
                  formData.referrerRewardType === "percentage" ? "0.1" : "1"
                }
                value={formData.referrerRewardValue}
                onChange={(e) =>
                  handleRewardValueChange("referrer", e.target.value)
                }
                className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={
                  formData.referrerRewardType === "percentage" ? "0.0%" : "0.00"
                }
              />
            </div>
          </div>
        )}

        {(formData.rewardRecipients === "both" ||
          formData.rewardRecipients === "referred") && (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">
              Rewards for referred user
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="referred-fixed"
                  name="referredRewardType"
                  type="radio"
                  value="fixed"
                  checked={formData.referredRewardType === "fixed"}
                  onChange={() => handleRewardTypeChange("referred", "fixed")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="referred-fixed"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Fixed
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="referred-percentage"
                  name="referredRewardType"
                  type="radio"
                  value="percentage"
                  checked={formData.referredRewardType === "percentage"}
                  onChange={() =>
                    handleRewardTypeChange("referred", "percentage")
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="referred-percentage"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Percentage %
                </label>
              </div>
            </div>
            <div>
              <input
                type="number"
                min="0"
                step={
                  formData.referredRewardType === "percentage" ? "0.1" : "1"
                }
                value={formData.referredRewardValue}
                onChange={(e) =>
                  handleRewardValueChange("referred", e.target.value)
                }
                className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder={
                  formData.referredRewardType === "percentage" ? "0.0%" : "0.00"
                }
              />
            </div>
          </div>
        )}

        <div className="p-4 border rounded-lg bg-blue-50">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Customer sees:
          </h3>
          <p className="text-sm text-gray-600">
            {formData.rewardRecipients === "both" &&
              `Get $${formData.referrerRewardValue} when your friend makes a purchase, and your friend gets $${formData.referredRewardValue} off their first order.`}
            {formData.rewardRecipients === "referrer" &&
              `Earn $${formData.referrerRewardValue} for every friend who makes a purchase.`}
            {formData.rewardRecipients === "referred" &&
              `Your friend gets $${formData.referredRewardValue} off their first purchase.`}
          </p>
        </div>
      </div>
    </div>
  );
}
