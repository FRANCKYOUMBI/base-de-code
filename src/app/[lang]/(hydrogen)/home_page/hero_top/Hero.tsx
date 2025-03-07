import Button from '@/components/Button'
import { routes } from '@/config/routes'
import Link from 'next/link'

export default function Hero({ lang }: { lang?: string }) {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-20">
      <div className="container max-w-[1220px] mx-auto px-4 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Digital Solutions for Your Business
            </h1>
            <p className="text-xl mb-8">
              We create innovative digital solutions to help your business grow and succeed
              in the digital age.
            </p>
            <Button variant="outline" className="hover:bg-primary">
              <Link href={routes.auth.register}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
