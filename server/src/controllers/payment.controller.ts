import Stripe from "stripe";
import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import { BadRequestError, NotFoundError } from "../errors";
import { PaymentIntentResponse } from "../types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntentController = async (req: Request, res: Response) => {
  const { numberOfNights } = req.body;
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new NotFoundError("Hotel Not Found");
  }
  const totalCost = hotel.pricePerNight * Number(numberOfNights);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "usd",
    metadata: {
      hotelId,
      userId: req.userId,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new BadRequestError("Error creating payment intent");
  }

  const response: PaymentIntentResponse = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.status(200).json(response);
};

export {
    createPaymentIntentController,
  };
  