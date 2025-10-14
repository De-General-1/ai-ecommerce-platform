"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesShowcase } from "@/components/features-showcase"
import { HowItWorks } from "@/components/how-it-works"
import { SocialProof } from "@/components/social-proof"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Prefetch campaign route for faster navigation
    router.prefetch('/campaign')
  }, [router])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesShowcase />
      <HowItWorks />
      <SocialProof />
      {/* <PricingSection /> */}
      <CTASection />
      <Footer />
    </div>
  )
}