import NotFoundMiddleware from "./notFound.middleware";
import ErrorHandlerMiddleware from "./error.middleware";
import {
  ValidateUserRegistration,
  ValidateLoginUser,
  ValidateCreateHotel
} from "./validate.middleware";
import VerifyTokenMiddleware from "./authentication.middleware";
import MediaUploadMiddleware from "./mediaHandling.middleware";

export {
  NotFoundMiddleware,
  ErrorHandlerMiddleware,
  ValidateUserRegistration,
  ValidateLoginUser,
  VerifyTokenMiddleware,
  MediaUploadMiddleware,
  ValidateCreateHotel
};
