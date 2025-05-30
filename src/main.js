import {web} from "./application/web.js";
import {logger} from "./application/logging.js";

web.listen(3001, () => {
    logger.info("App Start!");
});