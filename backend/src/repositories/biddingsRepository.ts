import { Bidding } from "@prisma/client";
import { client } from "../database.js";

export async function createBiddings(data: Bidding[] | Bidding) {
  if (Array.isArray(data)) {
    data.map(async (bidding) => {
      await client.bidding.upsert({
        create: bidding,
        update: bidding,
        where: {
          ref: bidding.ref,
        },
      });
    });
  } else {
    await client.bidding.upsert({
      where: {
        ref: data.ref,
      },
      create: data,
      update: data,
    });
  }
}
