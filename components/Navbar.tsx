"use client";

import { FileText, Menu, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      title: "Upload & Sign",
      description: "Upload documents and add signatures in minutes",
      href: "/#features",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Lightning Fast",
      description: "Complete signing process in under 3 minutes",
      href: "/#features",
      icon: <Zap className="h-4 w-4" />
    }
  ];

  return (
    <section className="sticky top-0 z-50 w-full py-2.5 bg-background border-b">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Logo />
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-6 w-6 aspect-square items-center justify-center rounded-md bg-blue-100 text-blue-600">
                            {feature.icon}
                          </div>
                          <div>
                            <p className="mb-1 font-semibold text-foreground">
                              {feature.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="mailto:mkumar.react@gmail.com"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#faq"
                  className={navigationMenuTriggerStyle()}
                >
                  FAQ
                </NavigationMenuLink>
              </NavigationMenuItem>
              <SignedOut>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/pricing"
                    className={navigationMenuTriggerStyle()}
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </SignedOut>
              <SignedIn>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/account/billing"
                    className={navigationMenuTriggerStyle()}
                  >
                    Billing
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </SignedIn>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <SignedOut>
              <Link href={'/sign-in'}>
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href={'/sign-up'}>

                <Button>Start for free</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link className={buttonVariants({ variant: "ghost" })} href={'/dashboard'}>
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">
                {/* Mobile Features Section */}
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted/70"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                              {feature.icon}
                            </div>
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4 border-t pt-4">
                  <a
                    href="mailto:mkumar.react@gmail.com"
                    className="font-medium hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
                  <Link
                    href="/#faq"
                    className="font-medium hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </Link>
                  <SignedOut>
                    <Link
                      href="/pricing"
                      className="font-medium hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Pricing
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/account/billing"
                      className="font-medium hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Billing
                    </Link>
                  </SignedIn>
                </div>

                {/* Mobile Auth Section */}
                <div className="mt-6 flex flex-col gap-4 border-t pt-6">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Start for free
                      </Button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className={buttonVariants({ variant: "outline", className: "w-full" })}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div className="flex justify-center pt-2">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
