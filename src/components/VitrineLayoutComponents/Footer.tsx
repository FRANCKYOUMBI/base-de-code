import Link from "next/link";
import Image from "next/image";

const Footer = () => {

    const menus = [
        {
            title: "Accueil",
            href: "/"
        },
        {
            title: "À propos",
            href: '/a-propos'
        },
        // {
        //     title: 'Services',
        //     href: "/services"
        // },
        {
            title: 'Inscription',
            href: "/inscription"
        },
        {
            title: 'Connexion',
            href: '/connexion'
        },
        {
            title: 'Contact',
            href: '/contact'
        }
    ]

    const socialNetwork = [
        {
            title: 'Facebook',
            href: '#'
        },
        {
            title: 'Instagram',
            href: "#",
        },
        {
            title: "LinkedIn",
            href: "#"
        },
        {
            title: "Twitter",
            href: "#"
        }
    ]

    return (
        <footer className={'bg-black'}>
            <div className={'container text-white flex items-start flex-wrap lg:flex-nowrap justify-center gap-4 py-83'}>
                <div className={'flex justify-between gap-7 items-start flex-1'}>
                    <div>
                        <h3 className={'font-bold text-xl'}>Menu</h3>
                        <nav className={'flex flex-col mt-4 gap-1 text-lg font-thin'}>
                            {menus.map((m, index) => <Link key={`footer_menu_section_${index}`} href={m.href}>
                                {m.title}
                            </Link>)}
                        </nav>
                    </div>
                    <div>
                        <h3 className={'font-bold text-xl'}>Mentions légales</h3>
                        <nav className={'flex flex-col mt-4 text-lg font-thin gap-1'}>
                            <Link href={'/politique-de-confidentialité'}>
                                Politique de confidentialité
                            </Link>
                            <Link href={'/mentions-legales'}>
                                Mentions légales
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className={'min-w-max order-first w-full md:w-auto md:order-none'}>
                    <Image
                        src={'/logo_white.png'}
                        alt={'logo white'}
                        height={250}
                        width={250}
                        draggable={false}
                        className={'mx-auto'}
                    />
                </div>
                <div className={'flex flex-1 h-full justify-between items-start gap-7'}>
                    <div>
                        <h3 className={'font-bold text-xl'}>Nous contacter</h3>
                        <nav className={'flex flex-col mt-4 text-lg font-thin gap-1'}>
                            <Link href={'mailto:contact@vquariusvgency.com'}>
                                Adresse email
                            </Link>
                            <Link href={'tel://0033758025764'}>
                                Numéro de téléphone
                            </Link>
                            <Link href={'#'}>
                                Localisation
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <h3 className={'font-bold text-xl'}>Réseaux sociaux</h3>
                        <nav className={'flex flex-col mt-4 text-lg font-thin gap-1 '}>
                            {socialNetwork.map((m, index) => <Link key={`footer_menu_social_network_${index}`} href={m.href}>
                                {m.title}
                            </Link>)}
                        </nav>
                    </div>
                </div>
            </div>
            <div className={'bg-secondary p-4 text-xs text-center text-white italic'}>
                {`Copyright ${new Date().getFullYear()} (c) - VQUARIUS VGENCY`}
            </div>
        </footer>
    );
}

export default Footer;