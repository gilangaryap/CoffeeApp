interface ImageDisplayProps {
  currentImage: string;
  images: string[];
  onImageClick: (img: string) => void;
}

export const ImageDisplay = ({
  currentImage,
  images,
  onImageClick,
}: ImageDisplayProps) => {
  return (
    <div className="w-full h-[300px] bg-black">
      <img
        className="h-[300px] md:h-full w-full object-cover"
        src={currentImage}
        alt="Product"
      />
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, index) => (
          <div key={index} className="h-[80px] lg:h-[162px]">
            <img
              className="w-full h-[80px] lg:h-[162px] object-cover cursor-pointer"
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => onImageClick(img)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
