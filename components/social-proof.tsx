"use client"

import { Star, TrendingUp, Users, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "E-commerce Director",
    company: "StyleCraft",
    avatar: "/placeholder-user.jpg",
    content: "Our engagement rates increased by 340% after using the AI campaigns. The Voice of Market feature helped us understand exactly what our audience wanted.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez", 
    role: "Marketing Manager",
    company: "TechGear Pro",
    avatar: "/placeholder-user.jpg",
    content: "Lokalize transformed our global expansion. We launched in 12 countries simultaneously with culturally adapted content that actually resonated.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Founder",
    company: "Artisan Goods",
    avatar: "/placeholder-user.jpg", 
    content: "The Content Studio lets me maintain my brand voice while leveraging AI efficiency. It's like having a creative team that never sleeps.",
    rating: 5
  }
]

const stats = [
  {
    icon: TrendingUp,
    value: "80%",
    label: "Average Engagement Increase",
    color: "text-green-600"
  },
  {
    icon: Users,
    value: "100",
    label: "Active Creators",
    color: "text-blue-600"
  },
  {
    icon: Globe,
    value: "10+",
    label: "Countries Supported",
    color: "text-purple-600"
  },
  {
    icon: Star,
    value: "4.5/5",
    label: "Customer Rating",
    color: "text-yellow-600"
  }
]

export function SocialProof() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Trusted by
            <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mt-6">
              Growth-Focused Brands
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of e-commerce brands already using our AI platform to create 
            campaigns that convert and scale globally.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}