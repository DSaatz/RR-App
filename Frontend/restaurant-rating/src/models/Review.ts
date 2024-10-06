export interface Review {
    id: string;
    userId: string;
    restaurantName: string;
    ambienceRating: number;
    serviceRating: number;
    tasteRating: number;
    platingRating: number;
    locationRating: number;
    priceToValueRating: number;
    reviewDate: Date;
    reviewText: string;
    images: string[];
}