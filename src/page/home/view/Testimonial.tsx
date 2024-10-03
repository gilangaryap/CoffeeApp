import { useState } from "react";
import { TestimonialCard } from "../../../components/card/TestimonialCard";

interface ITestimonialBody {
  full_name: string;
  comment: string;
  rating: string;
  user_img: string;
  user_phone: string;
}

const dummyTestimonials: ITestimonialBody[] = [
  {
    user_img: "src/assets/images/testimonial1.jpg",
    full_name: "Vie Robert",
    user_phone: "Manager Coffee Shop",
    comment:
      "“Wow... I am very happy to spend my whole day here. The Wi-Fi is good, and the coffee and meals tho. I like it here!! Very recommended!”",
    rating: "5",
  },
  {
    user_img: "src/assets/images/testimonial2.jpg",
    full_name: "Alice Johnson",
    user_phone: "Barista",
    comment:
      "“The ambiance is great, and the staff is super friendly. A perfect place to relax!”",
    rating: "4",
  },
  {
    user_img: "src/assets/images/testimonial3.jpg",
    full_name: "Michael Smith",
    user_phone: "Freelancer",
    comment:
      "“I love working here! The Wi-Fi is fast, and the coffee keeps me energized.”",
    rating: "5",
  },
  {
    user_img: "src/assets/images/testimonial4.jpg",
    full_name: "Emma Watson",
    user_phone: "Graphic Designer",
    comment:
      "“A cozy place with delicious coffee. I come here almost every day!”",
    rating: "4",
  },
  {
    user_img: "src/assets/images/testimonial5.jpg",
    full_name: "John Doe",
    user_phone: "Regular Customer",
    comment: "“A hidden gem! The best coffee shop in town.”",
    rating: "5",
  },
];

export const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const testimonialsPerPage = 1;

  const totalTestimonials = dummyTestimonials.length;
  const totalPages = Math.ceil(totalTestimonials / testimonialsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentIndex = (currentPage - 1) * testimonialsPerPage;
  const testimonial = dummyTestimonials[currentIndex];
  return (
    <main>
      <TestimonialCard
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        testimonial={testimonial}
      />
    </main>
  );
};
