interface TextButtonProps {
  text: string;
  onClick: () => void;
  style?: string;
}

export const TextButton = ({ text, onClick, style }: TextButtonProps) => {
  return (
    <button className={`py-2 ${style} bg-transparent border-none cursor-pointer`}
      onClick={onClick}>
      {text}
    </button>
  );
};
