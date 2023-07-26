const mongoose = require("mongoose");

const connection = async () => {
  try {
    const response = await mongoose.connect(process.env.URI_CONNECT);
    console.log("connected");
    return response;
  } catch (error) {
    return { ok: false, msg: "error connecting to database", error };
  }
};

module.exports = { connection };
