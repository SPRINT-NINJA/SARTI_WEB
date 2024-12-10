interface StarsCount {
    starsNumber: number;
    count: number;
  }
  
  interface RatingResponse {
    rating: number;
    ratingCount: number;
    starsCount: StarsCount[];
  }
  