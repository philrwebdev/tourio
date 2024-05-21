import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
// import { places } from "../../../lib/db";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      return response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log("Error while POSTing: ", error);
      return response.status(400).json({ error: error.message });
    }
  }

  // return response.status(200).json(places);
}
