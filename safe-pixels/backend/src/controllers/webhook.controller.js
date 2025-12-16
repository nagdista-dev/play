import whook from "../configs/svix.js";
import User from "../models/User.js";
// !Start Building
const webhookController = async (req, res) => {
  try {
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    const payload = JSON.stringify(req.body);
    whook.verify(payload, headers);
    const { data, type } = req.body;
    const newUser = {
      _id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
    };
    await User.create(newUser);
    res.json({ message: "User Created Successfully", name: newUser.name });
    // !Response
  } catch (error) {
    res.json(error.message);
  }
};

export default webhookController;
