import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWTGetUserId = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decodedToken.userId;
    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
