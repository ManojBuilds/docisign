import Link from "next/link"
import { Button } from "./ui/button"

const StartTrialBtn = () => {
    return (
        <div className="relative">
            <Link href={"/sign-in"}>
                <Button
                    size="lg"
                    className="px-8 py-6 text-lg rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
                >
                    Start Your 7-Day Free Trial
                </Button>
            </Link>
        </div>
    )
}

export default StartTrialBtn