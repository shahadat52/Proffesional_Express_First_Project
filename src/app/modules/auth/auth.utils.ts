import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expireTime: string,
) => {
 return jwt.sign(
    {
      data: jwtPayload,
    },
    secret,
    { expiresIn: expireTime },
  );
};


