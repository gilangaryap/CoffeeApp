interface SizeSelectorProps {
  selectedSize: number | undefined;
  onSizeChange: (size: number) => void;
}

export const SizeInput = ({onSizeChange,selectedSize,}: SizeSelectorProps) => {
  return (
    <div>
      <h1 className="text-lg font-bold">Choose Size</h1>
      <div className="flex flex-row justify-between">
        {['Regular', 'Large', 'Medium'].map((size, index) => (
          <button
            key={index}
            style={{ backgroundColor: selectedSize === index + 1 ? 'blue' : 'white' }}
            onClick={() => onSizeChange(index + 1)}
            className="py-2 w-full text-base border border-solid border-white text-lightgray hover:border-primary active:bg-darkgray focus:border-primary focus:text-black"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
};
