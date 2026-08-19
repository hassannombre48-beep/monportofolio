import app from "./app";
import { ENV } from "./config/env";
import { logger } from "./config/logger";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});