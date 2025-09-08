import { Loading } from "@/components/loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Manage Your Documents",
  description:
    "Manage your electronic signature documents, track signing status, and organize your workflow efficiently.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function DashboardLoading() {
  return <Loading className="flex-1" />;
}
