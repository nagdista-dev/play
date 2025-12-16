import { Webhook } from "svix";

const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

export default whook;
