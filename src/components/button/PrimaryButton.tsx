interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  style?: string;
}

export const PrimaryButton = ({ text, onClick, style }: PrimaryButtonProps) => {
  return (
    <button
      className={`rounded-lg ${style} text-black py-2 bg-orange-500 opacity-100 border-none text-sm`} onClick={onClick}>
      {text}
    </button>
  );
};
