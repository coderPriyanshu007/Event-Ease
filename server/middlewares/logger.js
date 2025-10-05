
export const bookingLogger = (req, res, next) => {
  console.log(
    `Booking attempt: user=${req.user?.id}, time=${new Date().toISOString()}`
  );
  next();
};
