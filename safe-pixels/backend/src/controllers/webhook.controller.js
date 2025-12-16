import whook from "../configs/svix.js";
import User from "../models/User.js";
// !Start Building
const webhookController = async (req, res) => {
  try {
    console.log("webhook controller starting")
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    const payload = JSON.stringify(req.body);
    console.log(payload)
    whook.verify(payload, headers);
    console.log("after verify")
    const { data, type } = req.body;
    const newUser = {
      _id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
    };

    if (type === "user.created") {
      console.log("user created")
      await User.create(newUser);
      return res.json({
        message: "User Created Successfully",
        name: newUser.name,
      });
    } else if (type === "user.updated") {
      const user = await User.findByIdAndUpdate(data.id, newUser);
      await user.save();
      return res.json({
        message: "User Updated Successfully",
        name: newUser.name,
      });
    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      return res.json({
        message: "User Deleted Successfully",
      });
    } else {
      return res.json({
        message: "Empty Response",
      });
    }
  } catch (error) {
    res.json(error.message);
  }
};

export default webhookController;
