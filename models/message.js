const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  added: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

MessageSchema.virtual("added_formatted").get(function () {
  return DateTime.fromJSDate(this.added).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model("Message", MessageSchema);
