interface IceHotSelectorProps {
  selectedOption: number | undefined;
  onOptionChange: (option: number) => void;
}

export const IceHotInput = ({
  onOptionChange,
  selectedOption,
}: IceHotSelectorProps) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onOptionChange(1)}
        className={`text-lg font-bold py-2 w-full border border-solid text-lightgray hover:border-primary active:bg-darkgray focus:border-primary focus:text-black ${
          selectedOption === 1 ? "bg-transparent border-primary text-black" : "bg-transparent border-[#E8E8E8]"
        }`}>
        Hot
      </button>
      <button
        onClick={() => onOptionChange(2)}
        className={`text-lg py-2 w-full border border-solid text-lightgray hover:border-primary active:bg-darkgray focus:border-primary focus:text-black${
          selectedOption === 2 ? "bg-transparent border-primary text-black" : "bg-transparent border-[#E8E8E8]"
        }`}>
        Ice
      </button>
    </div>
  );
};