"use strict";

import server from "./app.mjs";
import config from "./config/app.config.mjs";

server.listen(config.port, () => {
    console.log(`Express server listening on port ${ config.port }`);
});

export default server;