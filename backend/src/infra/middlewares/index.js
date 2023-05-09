import { bodyParser } from "./body-parser.js";
import { corsFunction } from "./cors.js";

export default (app) => {
  app.use(bodyParser);
  app.use(corsFunction);
};