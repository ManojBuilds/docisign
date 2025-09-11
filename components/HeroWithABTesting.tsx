"use client";

import { useEffect, useState } from "react";
import HeroProps from "@/components/Hero";
import { HeadlineVariation, getRandomHeadlineVariation } from "@/lib/ab-testing";

interface HeroWithABTestingProps {
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const HeroWithABTesting = ({
  description,
  button,
}: HeroWithABTestingProps) => {
  const [headlineVariation, setHeadlineVariation] = useState<HeadlineVariation>("original");

  useEffect(() => {
    // Get a random headline variation for A/B testing
    const variation = getRandomHeadlineVariation();
    setHeadlineVariation(variation);
    
    // In a real implementation, you might want to track which variation was shown
    // For example, you could send this information to your analytics service
    console.log(`Showing headline variation: ${variation}`);
  }, []);

  return (
    <HeroProps
      description={description}
      button={button}
      headlineVariation={headlineVariation}
    />
  );
};

export default HeroWithABTesting;