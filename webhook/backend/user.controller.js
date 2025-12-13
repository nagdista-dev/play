import { Webhook } from "svix";
import User from "./user.models.js";

const webhookController = async (req, res) => {
  try {
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    const whook = new Webhook(process.env.CLERK_WEBHOOK_KEY);

    whook.verify(JSON.stringify(req.body), headers);
    // !
    const { data, type } = req.body;

    const newUser = {
      _id: data?.id,
      name: data?.first_name + " " + data?.last_name,
      email: data?.email_addresses?.[0]?.email_address || null,
      image: data?.image_url,
    };

    if (type === "user.created") {
      await User.create(newUser);
    } else if (type === "user.updated") {
      const user = await User.findByIdAndUpdate(data.id, newUser);
      user.save();
    } else if (type === "user.deleted") {
      const user = await User.findByIdAndDelete(data.id);
      user.save();
    } else {
      console.log("non of three status");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default webhookController;
