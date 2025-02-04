type TJwtConstants = {
  secret: string | undefined;
};

export const jwtConstants: TJwtConstants = {
  secret: process.env.JWT_SECRET,
};
