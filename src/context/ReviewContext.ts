import {Review} from "@/models/Review";
import {createContext} from "react";

type ReviewContextType = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  setReviews: () => {},
});

export const ReviewProvider = ReviewContext.Provider;

