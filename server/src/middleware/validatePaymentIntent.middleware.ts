import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { BadRequestError, UnauthorizedError } from "../errors";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const ValidatePaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paymentIntentId = req.body.paymentIntentId;

  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId as string
  );

  if (!paymentIntent) {
    throw new BadRequestError("payment intent not found");
  }

  if (
    paymentIntent.metadata.hotelId !== req.params.id ||
    paymentIntent.metadata.userId !== req.userId
  ) {
    throw new UnauthorizedError("Payment Intent mismatch");
  }

  if (paymentIntent.status !== "succeeded") {
    throw new BadRequestError(
      `payment intent not succeeded. Status: ${paymentIntent.status}`
    );
  }
  next();
};

export default ValidatePaymentIntent;
