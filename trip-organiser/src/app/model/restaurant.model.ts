export interface Restaurant {
  id: string;
  restaurantTitle: string;
  cuisine: string;
  restaurantLocation: string;
  restaurantDescription: string;
  restaurantCost: string;
  restaurantLocationRef: string;
  restaurantUrl: string;
  created_at: string;
  updatedAt: string;
  restaurantTripRef: string;
  currentUserFavourite: boolean;
  totalUserFavourite: number;
  listOfUserWhoLike: string[];
}

