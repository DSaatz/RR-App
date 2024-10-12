import { Restaurant } from "@/models/Restaurant";

export const searchRestaurants = (restaurants: Restaurant[], query: string): Restaurant[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  return restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const scrollToRestaurant = (restaurantId: string) => {
  const element = document.getElementById(restaurantId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};