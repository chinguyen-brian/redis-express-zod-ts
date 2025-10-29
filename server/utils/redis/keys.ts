export function getKeyName(...args: string[]) {
  return `redis_nodejs:${args.join(":")}`;
}

export const restaurantKeyById = (id: string) => getKeyName("restaurants", id);