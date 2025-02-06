import React from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import { Categories } from '@/components/sections/Categories'
import { Features } from '@/components/sections/Features'
import { CTA } from '@/components/sections/CTA'
import { Stats } from '@/components/sections/Stats'


export default function Home() {
  return (
    <div>
      <Hero />
      <Stats/>
      <Categories />
      <Features />
      <CTA />
      <Link href="/dashboard">Dashboard
      </Link>
    </div>
  )
}
