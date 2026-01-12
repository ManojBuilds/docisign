import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, DollarSign, FileText, Key, Lock, Shield, Star, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "E-Signature vs Digital Signature: Key Differences Explained in 2026",
    description:
        "Confused about e-signatures vs digital signatures? Learn the key differences, security features, legal validity, and when to use each type. Clear, simple explanations for business owners.",
    keywords: [
        "esignature vs digital signature",
        "electronic signature vs digital signature",
        "difference between esignature and digital signature",
        "digital signature explained",
        "electronic signature security",
        "PKI digital signature",
        "qualified electronic signature",
        "esignature legal validity",
        "digital signature compliance",
        "boopsign",
        "signature types comparison",
    ],
    alternates: {
        canonical: "https://boopsign.com/esignature-vs-digital-signature",
    },
};

const signatureComparisonFaq = [
    {
        id: "faq-1",
        question: "What is the main difference between an e-signature and a digital signature?",
        answer:
            "An e-signature is any electronic method of signing documents (typed names, scanned images, clicks). A digital signature is a specific type of e-signature that uses cryptographic encryption (PKI technology) to provide advanced security, authentication, and tamper-proofing. Think of digital signatures as a secure subset of e-signatures.",
    },
    {
        id: "faq-2",
        question: "Which type of signature does BoopSign provide?",
        answer:
            "BoopSign provides legally compliant electronic signatures with advanced security features including audit trails, timestamps, IP address tracking, and encryption. Our e-signatures meet ESIGN Act and eIDAS standards, making them legally binding for business contracts, agreements, and documents.",
    },
    {
        id: "faq-3",
        question: "Are e-signatures legally binding?",
        answer:
            "Yes! E-signatures are legally binding in most countries under laws like the US ESIGN Act and EU eIDAS regulation. They have the same legal weight as handwritten signatures for most business documents, provided they meet requirements for intent, consent, and association with the document.",
    },
    {
        id: "faq-4",
        question: "When should I use a digital signature instead of an e-signature?",
        answer:
            "Digital signatures are best for highly sensitive documents requiring maximum security: government contracts, financial transactions, legal filings, healthcare records, and documents crossing international borders. For most business contracts, proposals, and agreements, secure e-signatures like BoopSign provide sufficient protection.",
    },
    {
        id: "faq-5",
        question: "Is a digital signature more secure than an e-signature?",
        answer:
            "Digital signatures use PKI cryptography for higher security and tamper-proofing. However, modern e-signature solutions like BoopSign employ strong security measures (encryption, audit trails, identity verification) that provide excellent protection for most business needs at a fraction of the complexity and cost.",
    },
    {
        id: "faq-6",
        question: "What is PKI and why does it matter for signatures?",
        answer:
            "PKI (Public Key Infrastructure) is a cryptographic system using paired public and private keys to create digital signatures. It ensures document authenticity and detects tampering. While PKI provides the highest security, most businesses don't need this level of complexity—secure e-signatures offer better usability for everyday contracts.",
    },
    {
        id: "faq-7",
        question: "Can I use e-signatures for international contracts?",
        answer:
            "Yes! E-signatures are recognized in over 60 countries including the US, Canada, UK, EU, Australia, and most of Asia. However, specific requirements vary by country. BoopSign's e-signatures comply with major international standards, making them suitable for cross-border business agreements.",
    },
    {
        id: "faq-8",
        question: "Do clients need special software to sign with BoopSign?",
        answer:
            "No! BoopSign works in any web browser on any device. Clients receive a secure link, review the document, and sign in under 60 seconds—no account creation, no downloads, no special software required. This is a huge advantage over complex digital signature solutions.",
    },
];

export default function ESignatureVsDigitalSignaturePage() {
    return (
        <div >
            {/* Hero Section */}
            <section className="text-center py-16 md:py-20 px-4 ">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-blue-600">E-Signature</span> vs{" "}
                        <span className="text-purple-600">Digital Signature</span>
                        <br />
                        What's the Difference?
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
                        Confused about electronic signatures vs digital signatures? You're not alone. This comprehensive guide explains the differences, security features, legal validity, and which type you actually need for your business.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
                        <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200"
                        >
                            Simple Explanations
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 border-blue-200"
                        >
                            Legal Compliance
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-purple-100 text-purple-800 border-purple-200"
                        >
                            Security Comparison
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-orange-100 text-orange-800 border-orange-200"
                        >
                            2026 Updated
                        </Badge>
                    </div>

                    <StartTrialBtn />

                    <div className="mt-8 text-sm text-gray-600">
                        Get started with secure e-signatures in 2 minutes • No credit card required
                    </div>
                </div>
            </section>

            {/* Quick Comparison Table */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            E-Signature vs Digital Signature: Quick Comparison
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Here's what you need to know at a glance
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-300">
                                        <th className="py-4 px-4 text-gray-900 font-bold">Feature</th>
                                        <th className="py-4 px-4 text-center text-blue-600 font-bold">
                                            Electronic Signature (E-Signature)
                                        </th>
                                        <th className="py-4 px-4 text-center text-purple-600 font-bold">
                                            Digital Signature
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Technology Used
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-700">
                                            Basic verification (email, SMS, IP)
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-700">
                                            PKI cryptography with certificates
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Security Level
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-700">
                                            Good for most business needs
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-700">
                                            Highest security with encryption
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Tamper Detection
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-orange-600">
                                                <AlertCircle className="w-5 h-5" /> Audit trail only
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Cryptographic proof
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Ease of Use
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600 font-bold">
                                                <CheckCircle className="w-5 h-5" /> Very Easy
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-orange-600">
                                                <AlertCircle className="w-5 h-5" /> Complex Setup
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Cost
                                        </td>
                                        <td className="py-4 px-4 text-center font-bold text-green-600">
                                            $15-50/month
                                        </td>
                                        <td className="py-4 px-4 text-center font-bold text-red-600">
                                            $100+/month + certificates
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Legal Validity
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Legally binding
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Legally binding
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Signer Experience
                                        </td>
                                        <td className="py-4 px-4 text-center text-green-600 font-bold">
                                            Sign in 60 seconds
                                        </td>
                                        <td className="py-4 px-4 text-center text-orange-600">
                                            Requires certificates/setup
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Best For
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-700">
                                            Business contracts, proposals, HR
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-700">
                                            Government, finance, healthcare
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2">
                                    The Bottom Line
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    For 95% of businesses, secure e-signatures like BoopSign provide all the
                                    protection you need at a fraction of the cost and complexity. Digital signatures
                                    are overkill unless you're in heavily regulated industries or dealing with
                                    extremely sensitive documents.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is an E-Signature */}
            <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <FileText className="w-4 h-4" />
                                <span>Electronic Signature</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                What is an Electronic Signature (E-Signature)?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                An electronic signature is any digital method of indicating your intent to sign
                                a document or agreement. It's the broad umbrella term that includes everything
                                from typing your name at the end of an email to using sophisticated signing
                                platforms like BoopSign.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                E-signatures focus on <strong>ease of use and accessibility</strong> while still
                                providing legal validity. They've become the standard for business contracts,
                                proposals, HR documents, and everyday agreements because they're fast, convenient,
                                and legally compliant.
                            </p>
                        </div>

                        <div>
                            <Card className="bg-white shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Common Types of E-Signatures
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Typed Names</p>
                                            <p className="text-sm text-gray-600">
                                                Simply typing your name at the end of a document or email
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Drawn Signatures</p>
                                            <p className="text-sm text-gray-600">
                                                Drawing your signature with a mouse, stylus, or finger
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Click-to-Sign</p>
                                            <p className="text-sm text-gray-600">
                                                Checking boxes or clicking "I Agree" buttons
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Image Uploads</p>
                                            <p className="text-sm text-gray-600">
                                                Uploading a scanned image of your handwritten signature
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Platform Signatures</p>
                                            <p className="text-sm text-gray-600">
                                                Using tools like BoopSign with audit trails and verification
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is a Digital Signature */}
            <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-purple-50 to-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <Card className="bg-white shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        How Digital Signatures Work
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Certificate Issuance</p>
                                            <p className="text-sm text-gray-600">
                                                A trusted Certificate Authority (CA) issues a unique digital
                                                certificate to verify your identity
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Private Key Creation</p>
                                            <p className="text-sm text-gray-600">
                                                A unique private key is generated for signing documents
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Document Hashing</p>
                                            <p className="text-sm text-gray-600">
                                                The document is converted into a unique cryptographic hash
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                                            4
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Signature Encryption</p>
                                            <p className="text-sm text-gray-600">
                                                The hash is encrypted with your private key to create the signature
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                                            5
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Verification</p>
                                            <p className="text-sm text-gray-600">
                                                Recipients use the public key to verify authenticity and detect tampering
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <Lock className="w-4 h-4" />
                                <span>Digital Signature</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                What is a Digital Signature?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                A digital signature is a specific type of electronic signature that uses{" "}
                                <strong>PKI (Public Key Infrastructure) cryptography</strong> to provide the
                                highest level of security, authentication, and tamper detection.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Think of it as an electronic fingerprint that's mathematically bound to both
                                the document and the signer. Any change to the document—even a single
                                character—invalidates the signature, making forgery virtually impossible.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Digital signatures are required for highly regulated industries (government,
                                finance, healthcare) and international transactions where maximum security and
                                non-repudiation are essential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Differences Breakdown */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            6 Key Differences That Actually Matter
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Understanding these distinctions helps you choose the right signature type for your needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-blue-700">
                                    <Shield className="w-6 h-6" />
                                    1. Security & Authentication
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">E-Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Use basic verification methods like email, SMS codes, IP addresses, and
                                        timestamps. Modern platforms add audit trails and encryption for extra
                                        security.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Digital Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Use PKI cryptography with digital certificates from trusted authorities.
                                        Provide mathematical proof of identity and document integrity.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-purple-700">
                                    <AlertCircle className="w-6 h-6" />
                                    2. Tamper Detection
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">E-Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Rely on audit trails to track changes. You can see if something changed,
                                        but there's no cryptographic lock preventing alterations.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Digital Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Any change to the document invalidates the signature immediately. The
                                        cryptographic hash detects even single character modifications.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-green-700">
                                    <Zap className="w-6 h-6" />
                                    3. Ease of Use
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">E-Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Extremely simple. Click a link, review the document, sign in seconds.
                                        No setup, no certificates, no technical knowledge required.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Digital Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Complex setup required. Must obtain digital certificates, install
                                        software, manage private keys, and understand PKI infrastructure.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-orange-700">
                                    <DollarSign className="w-6 h-6" />
                                    4. Cost Difference
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">E-Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Affordable at $15-50/month for unlimited signatures. BoopSign is just
                                        $15/month with no per-signature fees or hidden costs.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Digital Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Expensive at $100+/month plus certificate costs ($50-200 annually per
                                        user). Total costs can reach $1,000+/year per user.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-pink-50 to-white border-pink-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-pink-700">
                                    <Key className="w-6 h-6" />
                                    5. Identity Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">E-Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Verify identity through email confirmation, phone verification, or
                                        knowledge-based authentication. Good enough for most business needs.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Digital Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Identity verified by trusted Certificate Authorities using government
                                        IDs and background checks. Highest level of authentication.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-teal-50 to-white border-teal-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-teal-700">
                                    <CheckCircle className="w-6 h-6" />
                                    6. Legal Validity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">E-Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Legally binding under ESIGN Act (US) and eIDAS (EU) for most business
                                        documents. Accepted in 60+ countries worldwide.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-2">Digital Signatures:</p>
                                    <p className="text-gray-700 text-sm">
                                        Also legally binding with additional compliance for regulated industries.
                                        Required for some government and international transactions.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* When to Use Which */}
            <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            When Should You Use Each Type?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Choose the right signature type based on your document and industry requirements
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-700 text-2xl">
                                    <CheckCircle className="w-7 h-7" /> Use E-Signatures For...
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Business Contracts & Proposals</span>
                                            <p className="text-sm text-gray-600">
                                                Client agreements, service contracts, sales proposals
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">HR Documents</span>
                                            <p className="text-sm text-gray-600">
                                                Offer letters, employment agreements, NDAs
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Real Estate Transactions</span>
                                            <p className="text-sm text-gray-600">
                                                Leases, rental agreements (where legally accepted)
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Sales & Procurement</span>
                                            <p className="text-sm text-gray-600">
                                                Purchase orders, vendor agreements, quotes
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Internal Approvals</span>
                                            <p className="text-sm text-gray-600">
                                                Budget approvals, policy acknowledgments
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Freelance Work</span>
                                            <p className="text-sm text-gray-600">
                                                Consulting agreements, project contracts
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mt-6 pt-6 border-t border-blue-200">
                                    <p className="text-sm text-gray-600 italic">
                                        Perfect for 95% of business needs where ease and speed matter most
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-700 text-2xl">
                                    <Lock className="w-7 h-7" /> Use Digital Signatures For...
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <Lock className="text-purple-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Government Contracts</span>
                                            <p className="text-sm text-gray-600">
                                                Federal, state, local government agreements
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Lock className="text-purple-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Financial Transactions</span>
                                            <p className="text-sm text-gray-600">
                                                Banking, securities, loan documents requiring SEC compliance
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Lock className="text-purple-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Healthcare Records</span>
                                            <p className="text-sm text-gray-600">
                                                HIPAA-compliant medical documents, prescriptions
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Lock className="text-purple-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Legal Filings</span>
                                            <p className="text-sm text-gray-600">
                                                Court documents, notarized agreements
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Lock className="text-purple-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">International Trade</span>
                                            <p className="text-sm text-gray-600">
                                                Cross-border contracts requiring qualified signatures
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Lock className="text-purple-500 mt-1 flex-shrink-0 w-5 h-5" />
                                        <div>
                                            <span className="font-semibold">Regulated Industries</span>
                                            <p className="text-sm text-gray-600">
                                                Pharma, aerospace, defense requiring strict compliance
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mt-6 pt-6 border-t border-purple-200">
                                    <p className="text-sm text-gray-600 italic">
                                        Essential for highly regulated industries and maximum security needs
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Choose BoopSign */}
            <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-blue-700 to-blue-950 text-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why BoopSign's E-Signatures Are Perfect for Most Businesses
                        </h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Get all the security you need without the complexity and cost of digital signatures
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                            <p className="text-blue-100">
                                Clients sign in under 60 seconds from any device. No accounts, no downloads,
                                no friction. Just fast, secure signatures.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Fully Compliant</h3>
                            <p className="text-blue-100">
                                ESIGN Act and eIDAS compliant with complete audit trails, encryption, and
                                tamper detection. Legally binding in 60+ countries.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Just $15/Month</h3>
                            <p className="text-blue-100">
                                Unlimited signatures, unlimited documents. No per-signature fees, no hidden
                                costs. 10x cheaper than digital signature solutions.
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <StartTrialBtn />
                        <p className="mt-4 text-blue-100">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>

            {/* Security Features Comparison */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Security Features: How They Compare
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Modern e-signature platforms like BoopSign include robust security features
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="py-4 px-4 text-left text-gray-900 font-bold">
                                            Security Feature
                                        </th>
                                        <th className="py-4 px-4 text-center text-blue-600 font-bold">
                                            BoopSign E-Signatures
                                        </th>
                                        <th className="py-4 px-4 text-center text-purple-600 font-bold">
                                            Digital Signatures
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Identity Verification
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Email/SMS/IP
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> PKI Certificates
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Audit Trail
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Complete
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Complete
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Document Encryption
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> 256-bit SSL
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> PKI Encryption
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Timestamp
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Yes
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Yes
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Tamper Detection
                                        </td>
                                        <td className="py-4 px-4 text-center text-orange-600">
                                            Audit Trail Based
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Cryptographic
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-semibold text-gray-900">
                                            Certificate Authority
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-600">
                                            Not Required
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex justify-center items-center gap-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" /> Required
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real User Stories */}
            <section className="py-16 md:py-20 px-4 bg-gray-50">
                <div className="container mx-auto text-center max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Business Owners Say About E-Signatures
                    </h2>
                    <div className="flex justify-center mb-8">
                        <div className="flex text-yellow-400 text-2xl">
                            ★★★★★ <span className="text-gray-600 ml-2">4.9/5</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex justify-center text-yellow-400 mb-3">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="mb-4 italic text-gray-700">
                                    "We evaluated digital signatures but the complexity was insane. BoopSign
                                    gives us everything we need—legally binding signatures with audit trails—
                                    at a fraction of the cost."
                                </p>
                                <p className="font-semibold text-gray-900">- Michael R., Marketing Agency Owner</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex justify-center text-yellow-400 mb-3">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="mb-4 italic text-gray-700">
                                    "My clients love that they don't need to create accounts. I send a link,
                                    they sign in seconds, and I get paid faster. Haven't lost a single deal
                                    since switching to BoopSign."
                                </p>
                                <p className="font-semibold text-gray-900">- Lisa T., Freelance Designer</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex justify-center text-yellow-400 mb-3">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <p className="mb-4 italic text-gray-700">
                                    "As a small business, we couldn't justify the cost of digital signatures.
                                    BoopSign's e-signatures are perfect—secure, legal, and our clients can
                                    sign from their phones."
                                </p>
                                <p className="font-semibold text-gray-900">- David K., Consulting Firm</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <Faq
                        heading="E-Signature vs Digital Signature: Your Questions Answered"
                        items={signatureComparisonFaq}
                    />
                </div>
            </section>

            {/* Final CTA */}
            <Cta />
        </div>
    );
}