import { app } from "./app";
import { connectDb } from "./config/db";

const PORT = process.env.PORT || 3000;

// mongodb
connectDb();

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
