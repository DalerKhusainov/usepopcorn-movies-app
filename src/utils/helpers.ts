export const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, _: any, arr: string | any[]) =>
      acc + cur / arr.length,
    0
  );
