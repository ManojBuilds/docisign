import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, DollarSign, FileText, Send, Smartphone, Star, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Freelance Contract Template | Download & Sign Instantly in 2026",
    description:
        "Download our free freelance contract template and sign it instantly with BoopSign. Get paid on time, avoid scope creep, and protect your business with professional contracts.",
    keywords: [
        "freelance contract template",
        "free contract template",
        "freelance agreement template",
        "contract template for freelancers",
        "downloadable contract template",
        "sign contract online",
        "freelance contract generator",
        "independent contractor agreement",
        "professional contract template",
        "contract signing for freelancers",
        "esignature for contracts",
        "boopsign",
        "freelance contract",
    ],
    alternates: {
        canonical: "https://boopsign.com/freelance-contract-template",
    },
};

const contractTemplateFaq = [
    {
        id: "faq-1",
        question: "How do I use the freelance contract template with BoopSign?",
        answer:
            "Download our free template and customize it with your client details, project scope, rates, and terms using your preferred editor. Then upload your completed contract to BoopSign to add signature fields and send to clients.",
    },
    {
        id: "faq-2",
        question: "Can I get contracts signed quickly with BoopSign?",
        answer:
            "Absolutely! Upload your contract to BoopSign, add signature fields, and send to your client. They can review and sign in under 60 seconds on any device - no account required.",
    },
    {
        id: "faq-3",
        question: "Do my clients need to create accounts to sign contracts?",
        answer:
            "No! This is one of BoopSign's biggest advantages. Clients receive a secure link to your contract and can sign immediately without creating accounts or downloading software.",
    },
    {
        id: "faq-4",
        question: "Is the signed contract legally binding?",
        answer:
            "Yes! Electronic signatures are legally compliant with ESIGN Act and eIDAS regulations and have the same legal weight as handwritten signatures with full audit trails.",
    },
    {
        id: "faq-5",
        question: "Is the contract template suitable for my industry?",
        answer:
            "Our templates work for most service-based freelancing including design, writing, consulting, development, marketing, and more. Each template includes industry-standard clauses that can be customized as needed.",
    },
    {
        id: "faq-6",
        question: "How do I use the template with BoopSign?",
        answer:
            "Download the template and modify it with your specific project details, rates, and terms. Then upload your completed contract to BoopSign to add signature fields and send to clients.",
    },
    {
        id: "faq-7",
        question: "How do I know when contracts are signed?",
        answer:
            "BoopSign provides real-time notifications when clients sign your contracts. You get instant updates when agreements are executed, so you know exactly when to proceed with work.",
    },
];

export default function FreelanceContractTemplatePage() {
    return (
        <div >
            {/* Hero Section */}
            <section className="text-center py-16 md:py-20 px-4 ">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Free <span className="text-blue-600">Freelance Contract Template</span> & Sign Instantly
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
                        Download our professional contract template and sign it instantly with BoopSign.
                        Customize the template, add signature fields, and get contracts signed in seconds.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
                        <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200"
                        >
                            Free Download
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 border-blue-200"
                        >
                            No Account Required
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-purple-100 text-purple-800 border-purple-200"
                        >
                            Mobile-First Design
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-orange-100 text-orange-800 border-orange-200"
                        >
                            Industry Standard Templates
                        </Badge>
                    </div>

                    <StartTrialBtn />

                    <div className="mt-8 text-sm text-gray-600">
                        Join 2,847+ freelancers who've streamlined their contract process
                    </div>
                </div>
            </section>

            {/* Why Freelancers Need Contracts */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto text-center max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Every Freelancer Needs a Contract
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                        Research shows that freelancers with contracts get paid 78% faster and prevent 90% of disputes.
                        Don't leave your business vulnerable to scope creep and payment issues.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <Card className="bg-red-50 border-red-100">
                            <CardHeader>
                                <CardTitle className="text-red-800">
                                    Without a Contract: The Risks
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-700">
                                <p>
                                    <span className="font-bold">💸 Payment Issues:</span> No legal recourse
                                    if clients refuse to pay or delay payment.
                                </p>
                                <p>
                                    <span className="font-bold">📏 Scope Creep:</span> Unlimited extra work
                                    demands with no additional compensation.
                                </p>
                                <p>
                                    <span className="font-bold">🛡️ IP Disputes:</span> Unclear ownership
                                    of intellectual property and deliverables.
                                </p>
                                <p>
                                    <span className="font-bold">❌ Unprofessional Image:</span> Appears
                                    unprofessional to serious clients who expect formal agreements.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-green-50 border-green-100">
                            <CardHeader>
                                <CardTitle className="text-green-800">
                                    With a Contract: The Protection
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-700">
                                <p className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    <span>
                                        <span className="font-bold">Legal Protection:</span> Recourse for
                                        non-payment, scope changes, and disputes.
                                    </span>
                                </p>
                                <p className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    <span>
                                        <span className="font-bold">Clear Boundaries:</span> Defined scope
                                        prevents unauthorized work additions.
                                    </span>
                                </p>
                                <p className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    <span>
                                        <span className="font-bold">IP Clarity:</span> Ownership rights clearly
                                        defined and protected.
                                    </span>
                                </p>
                                <p className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                                    <span>
                                        <span className="font-bold">Professional Image:</span> Establishes
                                        you as a legitimate business partner.
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Essential Contract Clauses */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            8 Essential Clauses Every Contract Must Have
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our free templates include all these critical sections. Use them with BoopSign for fast, secure contract execution.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Parties & Scope of Work</h3>
                                    <p className="text-gray-700">
                                        Clearly identify both parties and define exactly what services you'll provide.
                                        Specificity prevents scope creep and misunderstandings.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Payment Terms</h3>
                                    <p className="text-gray-700">
                                        Set your rates, payment schedule, and late fees. Include deposit requirements
                                        and specify when payment is due (Net 30, upon completion, etc.).
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Easy Document Signing</h3>
                                    <p className="text-gray-700">
                                        Clients can sign your contracts quickly on any device in under 60 seconds.
                                        No account required and no software downloads needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Send className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Real-Time Notifications</h3>
                                    <p className="text-gray-700">
                                        Get instant notification when clients sign your contracts.
                                        Know exactly when agreements are executed.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Revision Limits</h3>
                                    <p className="text-gray-700">
                                        Set boundaries on revisions (typically 2-3 rounds). Define what
                                        constitutes a revision vs. new work requiring additional payment.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Termination Clause</h3>
                                    <p className="text-gray-700">
                                        Outline how either party can end the agreement, notice periods,
                                        and payment for work completed up to termination.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Head-to-Head Comparison Table */}
            <section
                id="compare"
                className="py-16 md:py-20 px-4 bg-white text-gray-800"
            >
                <div className="container mx-auto max-w-5xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Contract Signing Comparison
                    </h2>
                    <p className="text-xl mb-12 opacity-90">
                        How BoopSign compares to traditional contract signing methods.
                    </p>

                    <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 px-4 text-gray-900">Feature</th>
                                        <th className="py-4 px-4 text-center text-gray-900">BoopSign</th>
                                        <th className="py-4 px-4 text-center text-gray-900">Traditional Methods</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 text-gray-700">Mobile Experience</td>
                                        <td className="py-4 px-4 text-center font-bold text-green-600">
                                            <div className="flex justify-center items-center gap-2">
                                                <CheckCircle /> Optimized
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center text-red-600">
                                            <div className="flex justify-center items-center gap-2">
                                                <XCircle /> Issues
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 text-gray-700">
                                            Signer Account Required
                                        </td>
                                        <td className="py-4 px-4 text-center text-green-600">
                                            <div className="flex justify-center items-center gap-2">
                                                <CheckCircle /> No
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center text-red-600">
                                            <div className="flex justify-center items-center gap-2">
                                                <XCircle /> Yes
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 text-gray-700">
                                            Client Signing Time
                                        </td>
                                        <td className="py-4 px-4 text-center font-bold text-green-600">
                                            60 seconds
                                        </td>
                                        <td className="py-4 px-4 text-center text-red-600">
                                            3-5 days
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 text-gray-700">
                                            Monthly Cost
                                        </td>
                                        <td className="py-4 px-4 text-center font-bold text-green-600">
                                            $15/month
                                        </td>
                                        <td className="py-4 px-4 text-center text-red-600">
                                            $25+/month
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 text-gray-700">
                                            Setup Complexity
                                        </td>
                                        <td className="py-4 px-4 text-center text-green-600">Simple</td>
                                        <td className="py-4 px-4 text-center text-red-600">Complex</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Template Types Available */}
            <section className="bg-white py-16 md:py-20 px-4">
                <div className="container mx-auto text-center max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Industry-Specific Contract Templates
                    </h2>
                    <p className="text-xl mb-12 opacity-90">
                        Each template is crafted with industry-specific clauses and language.
                        Download, customize, then use with BoopSign for instant execution.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-gray-50">
                            <CardHeader>
                                <h3 className="font-bold text-xl">Creative Services</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FileText className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    Perfect for designers, writers, and marketing professionals.
                                    Includes IP ownership and creative approval clauses.
                                </p>
                                <ul className="text-left text-gray-700 space-y-2 pl-4">
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Portfolio rights protection</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Revision limits</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Creative approval process</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-50">
                            <CardHeader>
                                <h3 className="font-bold text-xl">Development & Tech</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Send className="w-8 h-8 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    Designed for developers and IT consultants.
                                    Includes technical specifications and delivery terms.
                                </p>
                                <ul className="text-left text-gray-700 space-y-2 pl-4">
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Technical requirements</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Testing and approval phases</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Support and maintenance terms</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-50">
                            <CardHeader>
                                <h3 className="font-bold text-xl">Consulting</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <Zap className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    Tailored for business and strategy consultants.
                                    Focuses on deliverables and confidentiality.
                                </p>
                                <ul className="text-left text-gray-700 space-y-2 pl-4">
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Confidentiality clauses</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Results and expectations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                        <span>Change management</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Real User Stories */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="container mx-auto text-center max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Freelancers Who Protected Their Business
                    </h2>
                    <div className="flex justify-center mb-8">
                        <div className="flex text-yellow-400 text-2xl">
                            ★★★★★ <span className="text-gray-600 ml-2">4.9/5</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <Card className="bg-gray-50">
                            <CardContent className="p-6">
                                <div className="flex justify-center text-yellow-400 mb-3">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="mb-4 italic">
                                    "I was getting constant 'scope creep' requests from clients. Since using
                                    BoopSign contracts, my clients respect the defined boundaries and I've
                                    increased my effective hourly rate by 40%."
                                </p>
                                <p className="font-semibold">- Alex M., Web Developer</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-50">
                            <CardContent className="p-6">
                                <div className="flex justify-center text-yellow-400 mb-3">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="mb-4 italic">
                                    "After a client refused to pay for months, I was able to enforce my
                                    contract terms and get paid in full. The contract saved my business
                                    that month. I use BoopSign for every agreement now."
                                </p>
                                <p className="font-semibold">
                                    - Sarah K., Content Writer
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-50">
                            <CardContent className="p-6">
                                <div className="flex justify-center text-yellow-400 mb-3">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="mb-4 italic">
                                    "The professional templates made me look more credible. My clients
                                    take me seriously now, and I rarely have payment issues since
                                    everything is clearly defined upfront."
                                </p>
                                <p className="font-semibold">
                                    - James T., Marketing Consultant
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Top Benefits */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Top 5 Benefits of Contract Templates + Secure Signing
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Combine our professional templates with BoopSign's fast, secure signing platform for complete business protection.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Get Paid On Time</h3>
                                    <p className="text-gray-700">
                                        Clear payment terms and late fees ensure clients pay when they're
                                        supposed to. No more chasing payments.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Prevent Scope Creep</h3>
                                    <p className="text-gray-700">
                                        Define exact deliverables to prevent clients from requesting
                                        unlimited extra work without compensation.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">
                                        Protect Your Intellectual Property
                                    </h3>
                                    <p className="text-gray-700">
                                        Maintain ownership rights and portfolio usage of your creative work.
                                        Prevent IP theft and misuse.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">
                                        Look Professional
                                    </h3>
                                    <p className="text-gray-700">
                                        Clients take you seriously when you present well-crafted contracts.
                                        Increases your perceived value and credibility.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                                    5
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">
                                        Resolve Issues Faster
                                    </h3>
                                    <p className="text-gray-700">
                                        When disputes arise, clear contract terms provide the framework
                                        for quick resolution instead of drawn-out conflicts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Use */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Is a Professional Contract Template Right for You?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-green-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-700">
                                    <CheckCircle /> Perfect for you if...
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                                    <li>You're a freelancer, independent contractor, or solopreneur</li>
                                    <li>You want to prevent scope creep and payment issues</li>
                                    <li>You're ready to look more professional to clients</li>
                                    <li>You value legal protection for your business</li>
                                    <li>You want industry-specific templates and a fast signing solution</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="border-gray-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-700">
                                    <ArrowRight /> Consider alternatives if...
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                                    <li>You're an employee rather than a contractor</li>
                                    <li>You have complex legal requirements that need custom drafting</li>
                                    <li>You need contract types not covered by our templates</li>
                                    <li>You're in a highly regulated industry with special requirements</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <Faq heading="Freelance Contract Template: Common Questions" items={contractTemplateFaq} />
                </div>
            </section>

            {/* Final CTA */}
            <Cta />
        </div>
    );
}