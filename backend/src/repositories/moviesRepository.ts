import { client } from "../database.js";

export async function getImdbAverageById(imdbId: string) {
  const response = await client.ratings.findFirst({
    where: {
      tconst: imdbId,
    },
    select: {
      averageRating: true,
    },
  });
  return response.averageRating;
}
