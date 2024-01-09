import NotFoundMiddleware from "./notFound.middleware";
import ErrorHandlerMiddleware from "./error.middleware";
import {
  ValidateUserRegistration,
  ValidateLoginUser,
  ValidateCreateHotel,
  ValidateUpdateHotel
} from "./validate.middleware";
import {VerifyTokenMiddleware, VerifyHotelOwnership} from "./authentication.middleware";
import MediaUploadMiddleware from "./mediaHandling.middleware";
import ValidateObjectId from './validateObjectId.middleware'
export {
  NotFoundMiddleware,
  ErrorHandlerMiddleware,
  ValidateUserRegistration,
  ValidateLoginUser,
  VerifyTokenMiddleware,
  MediaUploadMiddleware,
  ValidateCreateHotel,
  ValidateObjectId,
  VerifyHotelOwnership,
  ValidateUpdateHotel
};
