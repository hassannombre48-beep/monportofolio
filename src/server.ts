import app from "./app";
import { ENV } from "./config/env";
import { logger } from "./config/logger";

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
