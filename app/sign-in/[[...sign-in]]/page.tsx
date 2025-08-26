import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (<div className='min-h-svh flex flex-col items-center justify-center'>
        <SignIn />
    </div>)
}
