import app from "./app.js";
import { env } from "./core/config/env.js";

app.listen(env.PORT, () => {
  console.log(`VYTTAI STUDIO AI running on port ${env.PORT}`);
});
