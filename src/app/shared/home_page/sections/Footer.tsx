import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/config/routes'
import { usePathname } from 'next/navigation';

export default function Footer({ lang }: { lang?: string }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path) ? 'text-primary' : 'text-white hover:text-primary';
  };

  return (
    <footer className="bg-noir text-white">
      <div className="container max-w-[1220px] mx-auto px-4 2xl:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <p className='font-bold text-primary text-2xl'>HoldMyFuture</p>
            <p className="mt-4 text-sm">
              We provide high quality services to our clients using the most advanced technologies
              and employing the best experts in the industry.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Useful Links</h5>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href={routes.hero_top.services} className={`transition-colors duration-200 ${isActive(routes.hero_top.services)}`}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link href={routes.hero_top.career} className={`transition-colors duration-200 ${isActive(routes.hero_top.career)}`}>
                    Career
                  </Link>
                </li>
                <li>
                  <Link href={routes.hero_top.about} className={`transition-colors duration-200 ${isActive(routes.hero_top.about)}`}>
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact</h5>
            <div className="space-y-2">
              <p><a href="mailto:franckyoumbi1@yahoo.com">franckyoumbi1@yahoo.com</a></p>
              <p><a href="tel:+237693387980">(+237) 6 93 38 79 80</a></p>
              <p>Chapelle TKC, Yaoundé Cameroun, BP 8628</p>
            </div>
          </div>

          {/* Map */}
          <div className="col-span-1 md:col-span-1">
            <iframe
              className="w-full h-[250px] rounded-md"
              src="https://www.google.com/maps/embed/v1/place?q=KevMax+sarl,+Yaoundé,+Cameroon&key=YOUR_API_KEY"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="bg-white text-black py-4">
        <div className="container max-w-[1220px] mx-auto px-4 2xl:px-0 text-center">
          Copyright ©{new Date().getFullYear()} HoldMyFuture . All rights reserved
        </div>
      </div>
    </footer>
  )
}

