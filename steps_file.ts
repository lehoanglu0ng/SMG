// in this file you can append custom step methods to 'I' object
import joi from "joi"

export = function () {
  return actor({

    buildURL: function (data: any) {
      const url = new URL('http://localhost')
      url.searchParams.set('action', data.action || 'query')
      url.searchParams.set('format', 'json')
      url.searchParams.set('list', 'search')
      url.searchParams.set('continue', '-||')
      url.searchParams.set('formatversion', '2')
      if (data.keyword != null) url.searchParams.set('srsearch', data.keyword)
      url.searchParams.set('sroffset', data.offset?.toString() || 10)
      return url.search;
    },

    getSearchSchema: function (data) {
      const searchItemSchema = joi.object({
        "ns": joi.number(),
        "title": joi.string(),
        "pageid": joi.number(),
        "size": joi.number().integer().positive(),
        "wordcount": joi.number().integer().positive(),
        "snippet": joi.string(),
        "timestamp": joi.date()
      }).unknown();

      return joi.object({
        batchcomplete: joi.boolean(),
        continue: {
          sroffset: joi.number().integer().positive(),
          continue: joi.string()
        },
        query: {
          searchinfo: {
            totalhits: joi.number().integer().positive()
          },
          search: joi.array().items(searchItemSchema)
        }
      }).unknown();
    },

    getErrorSchema: function () {
      return joi.object({
        error: {
          code: joi.string(),
          info: joi.string(),
          docref: joi.string()
        }
      }).unknown();
    }
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

  });
}
