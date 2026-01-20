import type { Metadata } from 'next';
import BillingPageClient from './BillingPageClient';

export const metadata: Metadata = {
  title: 'Manage Your Plan - Boopsign Account Settings',
  description: 'Manage your Boopsign subscription, update billing information, and view usage statistics. Cancel or upgrade your plan anytime.',
  keywords: ['Boopsign account', 'manage subscription', 'billing settings', 'plan management'],
  robots: {
    index: false, // Keep account pages private
    follow: false,
  },
  // No OpenGraph for private account pages
}

export default function ManagePlanPage() {
  return <BillingPageClient />
}
