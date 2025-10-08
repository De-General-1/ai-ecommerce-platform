"use client"

import { Check, Zap, Crown, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for testing our AI capabilities",
    icon: Zap,
    features: [
      "5 campaigns per month",
      "Basic AI content generation", 
      "Instagram & Facebook support",
      "Standard templates",
      "Email support"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "For growing brands ready to scale",
    icon: Rocket,
    features: [
      "Unlimited campaigns",
      "Voice of the Market insights",
      "All platform support",
      "Advanced analytics",
      "Priority support",
      "Custom branding"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month", 
    description: "For global brands with complex needs",
    icon: Crown,
    features: [
      "Everything in Growth",
      "Lokalize (50+ countries)",
      "Content Studio access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export function PricingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Simple Pricing</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-5">
              Growth Plan
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our core AI features 
            with advanced capabilities unlocked at higher tiers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card key={index} className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-indigo-200 shadow-lg scale-105' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                      : 'bg-gradient-to-br from-slate-100 to-slate-200'
                  }`}>
                    <Icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-600 ml-1">{plan.period}</span>}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link href={plan.name === 'Enterprise' ? '/contact' : '/campaign'}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600">
            All plans include a 14-day free trial. No credit card required. 
            <Link href="/pricing" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
              View detailed comparison →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}