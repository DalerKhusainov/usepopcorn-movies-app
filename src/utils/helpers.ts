export const average = (arr: any) =>
  arr.reduce(
    (acc: number, cur: number, _: any, arr: string | any[]) =>
      acc + cur / arr.length,
    0
  );

// https://www.omdbapi.com/apikey.aspx?VERIFYKEY=3f49a9f2-9ef0-4e41-86c4-211cb0dc16a5
// http://www.omdbapi.com/?apikey=[yourkey]&
