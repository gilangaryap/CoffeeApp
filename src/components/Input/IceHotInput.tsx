interface IceHotSelectorProps {
  selectedOption: number | undefined;
  onOptionChange: (option: number) => void;
}

export const IceHotInput = ({onOptionChange,selectedOption}:IceHotSelectorProps) => {
  return (
    <div>
      <h1 className="text-lg font-bold">Hot/Ice?</h1>
      <div className="flex flex-row justify-between">
        {['Ice', 'Hot'].map((option, index) => (
          <button
            key={index}
            style={{ backgroundColor: selectedOption === index + 1 ? 'blue' : 'white' }}
            onClick={() => onOptionChange(index + 1)}
            className="py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary active:bg-darkgray focus:border-primary focus:text-black"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
};
