import app from "./app";
import Logger from "./logger/logger";

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  Logger.debug(
    `Server is up and running @ http://localhost:${process.env.PORT ?? PORT}`
  );
});
