"use strict";

import mainRoutes from "./main.routes.mjs";

export default (app) => {
    app.use("/api/main", mainRoutes);
};
