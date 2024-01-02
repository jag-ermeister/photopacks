const axios = require("axios");

const preSignUpHook = async (event) => {
  try {
    const email = event.request.userAttributes.email;
    console.log(email);
    const response = await axios.get(
      process.env.PHOTOPACKS_SIGN_UP_WHITELIST_URL
    );
    const allowedEmails = response.data;
    if (!allowedEmails.includes(email)) {
      throw new Error("PhotoPacks.AI is currently invite only.");
    }
    return event;
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response Body:", error.response.data);
    }
    throw error;
  }
};

module.exports = {
  preSignUpHook,
};
