export function getKeyName(...args: string[]) {
  return `redis_nodejs:${args.join(":")}`;
}
