import UsagePageClient from "@/app/(main)/profile/UsagePageClient";

export const metadata = {
    title: "Usage & Limits | Boopsign",
    description: "View your usage statistics and plan limits.",
};

export default function UsagePage() {
    return <UsagePageClient />;
}
