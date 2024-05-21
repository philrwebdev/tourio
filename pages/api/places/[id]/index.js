import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";
// import { places } from "../../../../lib/db.js";

export default async function handler(request, response) {

  const { id } = request.query;
  console.log("id in handler: ", id);

  await dbConnect();

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    // const product = await Product.findById(id);
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    } else {
      return response.status(200).json(place);
    }
  } 

  if (request.method === "PUT") {
    const updatedPlace = request.body;
    await Place.findByIdAndUpdate(id, updatedPlace);
    return response.status(200).json({status: "Place successfully updated."});

  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return response.status(200).json({status: "Place successfully deleted."});

  }

  // const place = places.find((place) => place.id === id);

  // if (!place) {
  //   return response.status(404).json({ status: "Not found" });
  // }

  // response.status(200).json(place);
}
