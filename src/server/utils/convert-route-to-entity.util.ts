const mapping: Record<string, string> = {
  companies: 'company',
  drivers: 'driver',
  emergencies: 'emergency',
  reviews: 'review',
  rides: 'ride',
  'ride-histories': 'ride_history',
  'split-fares': 'split_fare',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
