import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding ReviewSense database...')

  // Clear existing data
  await prisma.reviewSummary.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()

  // Create Product 1: MacBook Pro
  const macbook = await prisma.product.create({
    data: {
      name: 'MacBook Pro 16" M3 Max',
      description: 'Professional laptop with M3 Max chip, 36GB RAM, and stunning Liquid Retina XDR display. Perfect for developers, video editors, and creative professionals.',
      price: 3499.99,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', // MacBook
      reviews: {
        create: [
          {
            author: 'Michael Chen',
            rating: 5,
            comment: 'This MacBook Pro is an absolute powerhouse! I am a software developer working on machine learning projects, and the M3 Max chip handles everything I throw at it without breaking a sweat. Compiling large codebases that used to take 5-10 minutes on my old Intel MacBook now complete in under a minute.'
          },
          {
            author: 'Sarah Johnson',
            rating: 4,
            comment: 'Coming from a Windows laptop, the transition to macOS took some getting used to, but I am now completely converted. The build quality is exceptional - the aluminum unibody feels premium and sturdy.'
          },
          {
            author: 'David Kumar',
            rating: 5,
            comment: 'As a data scientist, this machine has transformed my workflow completely. Training machine learning models that used to take hours on my old laptop now complete in minutes thanks to the M3 Max chip.'
          }
        ]
      }
    }
  })

  // Create Product 2: PlayStation 5
  const ps5 = await prisma.product.create({
    data: {
      name: 'Sony PlayStation 5',
      description: 'Next-generation gaming console with ultra-high-speed SSD, ray tracing support, and 4K gaming capabilities. Includes DualSense wireless controller with haptic feedback.',
      price: 499.99,
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80', // PS5
      reviews: {
        create: [
          {
            author: 'Alex Thompson',
            rating: 5,
            comment: 'The PS5 is absolutely incredible! The loading times are mind-blowing - games that took 30-60 seconds to load on PS4 now load in under 5 seconds thanks to the ultra-fast SSD.'
          },
          {
            author: 'Rachel Martinez',
            rating: 4,
            comment: 'As someone who skipped the PS4 generation and upgraded from PS3, the jump in quality is absolutely staggering. The graphics in games like Demon Souls and Ratchet & Clank Rift Apart are photorealistic.'
          }
        ]
      }
    }
  })

  // Create Product 3: AirPods Pro
  const airpods = await prisma.product.create({
    data: {
      name: 'Apple AirPods Pro (2nd Gen)',
      description: 'Premium wireless earbuds with active noise cancellation, adaptive transparency, and spatial audio. Perfect for music, calls, and immersive listening experiences.',
      price: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80', // AirPods
      reviews: {
        create: [
          {
            author: 'Jennifer Wang',
            rating: 5,
            comment: 'These are hands down the best earbuds I have ever owned! The noise cancellation is absolutely phenomenal - I fly frequently for work and these completely block out airplane engine noise.'
          },
          {
            author: 'Marcus Johnson',
            rating: 4,
            comment: 'Coming from the original AirPods Pro, these are a significant upgrade in sound quality and noise cancellation. The ANC is noticeably stronger.'
          }
        ]
      }
    }
  })

  // Create Product 4: iPhone 15 Pro
  const iphone = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      description: 'Latest flagship smartphone with A17 Pro chip, titanium design, and advanced camera system with 5x optical zoom.',
      price: 999.99,
      imageUrl: 'https://images.unsplash.com/photo-1592286927505-8d4663b4e3f4?w=800&q=80', // iPhone
      reviews: {
        create: [
          {
            author: 'Emma Williams',
            rating: 5,
            comment: 'Upgraded from iPhone 12 Pro and the difference is incredible. The camera system is outstanding, especially the new 5x zoom lens.'
          },
          {
            author: 'James Anderson',
            rating: 4,
            comment: 'Great phone overall. The titanium build feels premium and the action button is actually quite useful once you get used to it.'
          }
        ]
      }
    }
  })

  // Create Product 5: Samsung Galaxy Watch
  const watch = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy Watch 6',
      description: 'Advanced smartwatch with health tracking, sleep monitoring, and comprehensive fitness features. Perfect companion for active lifestyles.',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80', // Smartwatch
      reviews: {
        create: [
          {
            author: 'Lisa Chen',
            rating: 5,
            comment: 'Best smartwatch I have owned! The health tracking features are incredibly accurate and the battery life easily gets me through 2 full days.'
          },
          {
            author: 'Tom Baker',
            rating: 4,
            comment: 'Really impressed with the build quality and features. Sleep tracking is excellent and provides detailed insights.'
          }
        ]
      }
    }
  })

  console.log('✅ Seeded products:')
  console.log(`  - ${macbook.name} (ID: ${macbook.id})`)
  console.log(`  - ${ps5.name} (ID: ${ps5.id})`)
  console.log(`  - ${airpods.name} (ID: ${airpods.id})`)
  console.log(`  - ${iphone.name} (ID: ${iphone.id})`)
  console.log(`  - ${watch.name} (ID: ${watch.id})`)
  
  console.log('\n📊 ReviewSense database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })