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
  usersWhoLike: [{
    uid: string,
    favourite: string,
  }];
  currentUserFavourite: boolean;
  totalUserFavourite: number;
}

