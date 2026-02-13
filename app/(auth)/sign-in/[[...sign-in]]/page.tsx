import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login | Boopsign',
    description: 'Login to your Boopsign account to manage your documents and signatures.',
}

export default function Page() {
    return <SignIn />
}