const whitelist = ["http://localhost:5173", "http://192.168.0.111:5173"];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  sameSite: "none",
  credentials: true,
};
