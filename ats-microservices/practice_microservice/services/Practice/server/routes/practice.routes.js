"use strict";

/**
 * Module dependencies
 */
import { listPracticeNames } from "../controllers/listPracticeNames";

export const routes = (app)  => {
    app.route("/api/v1/practice")
        .get(listPracticeNames);
};
