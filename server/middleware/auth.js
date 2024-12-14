import { AuthError } from "../errors/auth-error";
import  User  from "../database/models/UserModel";
import { StatusCodes } from "http-status-codes";

/**
 * Check if user is authorized and active
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export async function isActiveUser(
  req,
  res,
  next
) {
    /*
  const user = await getCurrentUser(req, res, next);

  if (!user || user.status !== ACTIVEUSERSTATUS) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "User not authorized. Not an active user" });
  }
    */

  next();
}

export const isAdmin = async (
  req,
  res,
  next
) => {
  await authorize(req, res, next, ADMINROLEID);
  next();
};

export const isFieldOwner = async (
  req,
  res,
  next
) => {
  await authorize(req, res, next, FIELDOWNERROLEID);
  next();
};

export const isReferee = async (
  req,
  res,
  next
) => {
  await authorize(req, res, next, REFEREEROLEID);
  next();
};

/**
 * Authorize user based on role
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @param role Role id
 */
const authorize = async (
  req,
  res,
  next,
  role
) => {
    /*
  const user = await getCurrentUser(req, res, next);
  console.log(`user: ${user?.roles[0]}`);

  if (!user || user.roles[0] !== role) {
      console.log(`not authorized`);
  }
    */
};

/**
 * Get current user from request object and return it
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns User
 */
const getCurrentUser = async (
  req,
  res,
  next
) => {
  if (!req.currentUser) {
    throw new AuthError("Not authorized");
  }

    /*
  const user = await User.findOne({  _id: req.currentUser._id  });

  return user;
    */
};
