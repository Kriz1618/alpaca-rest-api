import app from "./app";
import { PORT } from "./config";
import {
  cryptoStreamConnection,
  dataStreamConnection,
} from "./services";

async function main() {
  try {
    app.listen(PORT);
    console.log("Server on port", PORT);
    cryptoStreamConnection();
    dataStreamConnection();
  } catch (error) {
    console.error(error);
  }
}

main();