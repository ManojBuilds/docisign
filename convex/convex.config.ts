import resend from "@convex-dev/resend/convex.config";
import dodopayments from "@dodopayments/convex/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(resend);
app.use(dodopayments);

export default app;
