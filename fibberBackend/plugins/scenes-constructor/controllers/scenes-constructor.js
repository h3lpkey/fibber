"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * scenes-constructor.js controller
 *
 * @description: A set of functions called "actions" of the `scenes-constructor` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },
 
  // GET /get-all-quests
  getAllQuests: async (ctx) => {
    let entities = await strapi.services.quest.find();
    ctx.send({
      message: "ok",
      data: entities,
    });
  }, 

  // GET /get-all-scenes
  getAllScenes: async (ctx) => {
    let entities = await strapi.services.scene.find();
    ctx.send({
      message: "ok",
      data: entities,
    });
  },
};
