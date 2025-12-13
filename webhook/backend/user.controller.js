// import { Webhook } from "svix";
// import User from "./user.models.js";

// const webhookController = async (req, res) => {
//   try {
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     console.log("before verifying");
//     whook.verify(JSON.stringify(req.body), headers);
//     console.log("after verifying");
//     // !
//     const { data, type } = req.body;

//     const newUser = {
//       _id: data?.id,
//       name: data?.first_name + " " + data?.last_name,
//       email: data?.email_addresses?.[0]?.email_address || null,
//       image: data?.image_url,
//     };
// console.log(newUser)
//     if (type === "user.created") {
//       await User.create(newUser);
//       console.log("user Created");
//     } else if (type === "user.updated") {
//       await User.findByIdAndUpdate(data.id, newUser);
//       console.log("user updated");
//     } else if (type === "user.deleted") {
//        await User.findByIdAndDelete(data.id);
//       console.log("user deleted");
//     } else {
//       console.log("non of three status");
//     }
//     res.json({ message: "Webhook received" });
//   } catch (error) {
//     console.log(error.message);
//     res.json(error.message)
//   }
// };

// export default webhookController;

import { Webhook } from "svix";
import User from "./user.models.js";

const webhookController = async (req, res) => {
  try {
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    console.log("before verifying");

    whook.verify(JSON.stringify(req.body), headers);

    console.log("after verifying");

    const { data, type } = req.body;

    const newUser = {
      _id: data?.id,
      name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
      email: data?.email_addresses?.[0]?.email_address || null,
      image: data?.image_url || null,
    };

    console.log("Parsed user:", newUser);
    console.log("type", type);
    if (type === "user.created") {
      await User.create(newUser);
      console.log("User created");
      return res.json({ message: "User created successfully" });
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, newUser);
      console.log("User updated");
      return res.json({ message: "User updated successfully" });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("User deleted");
      return res.json({ message: "User deleted successfully" });
    }

    console.log("None of the three statuses");
    return res.json({ message: "Webhook received but no action taken" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

export default webhookController;
