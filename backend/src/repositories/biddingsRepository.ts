import { Bidding } from "@prisma/client";
import { client } from "../database.js";

export async function createBiddings(data: Bidding[]) {
  data.map(async (bidding) => {
    await client.bidding.upsert({
      create: bidding,
      update: bidding,
      where: {
        ref: bidding.ref,
      },
    });
  });
}
