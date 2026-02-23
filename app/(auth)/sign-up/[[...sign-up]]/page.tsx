import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up | Boopsign',
    description: 'Create your account to get started with Boopsign and manage your document signing needs.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function Page() {
    return <SignUp />
}
