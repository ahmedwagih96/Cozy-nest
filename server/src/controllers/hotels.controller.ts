import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import { NotFoundError } from "../errors";
import { SearchResponse } from "../shared/types";
import {
  constructObjectQueries,
  constructSorting,
} from "../utils/handleQueries";

const getHotelsController = async (req: Request, res: Response) => {
  
  // filtering
  const constructedQueries = constructObjectQueries(req.query);

  // Sorting
  const sort = constructSorting(req.query);

  // Pagination
  const pageSize = 3;
  const page = parseInt(
    req.query.pageNumber ? req.query.pageNumber.toString() : "1"
  );
  const skip = (page - 1) * pageSize;

  const hotels = await Hotel.find(constructedQueries)
    .sort(sort)
    .skip(skip)
    .limit(pageSize);
    
  const total = await Hotel.countDocuments(constructedQueries);

  const response: SearchResponse = {
    hotels,
    pagination: { total, pages: Math.ceil(total / pageSize) },
  };

  res.status(200).json(response);
};

const getHotelController = async (req: Request, res: Response) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    throw new NotFoundError("Hotel Not Found");
  }
  res.status(200).json({ hotel });
};

export { getHotelController, getHotelsController };
