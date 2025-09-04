
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const http = httpRouter();

http.route({
    path: "/send-email",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const { to, subject, html } = await request.json();

        await resend.emails.send({
            from: 'Boopsign <Boopsign@mail.heysheet.in>',
            to,
            subject,
            html,
        });

        return new Response(null, {
            status: 200
        });
    }),
});

export default http;
