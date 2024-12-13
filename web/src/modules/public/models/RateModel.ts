export type StarsCount = {
    starsNumber: number;
    count: number;
};

export type RatingObject = {
    rating: number;
    ratingCount: number;
    starsCount: StarsCount[];
};

export type CustomerReview = {
    id: number;
    customerName: string;
    rate: number;
    comment: string;
    image: string;
    status: boolean;
};