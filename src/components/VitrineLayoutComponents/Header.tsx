'use client'
import Image from "next/image";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

interface Props {
    isLogged: boolean;
}

const Header = ({isLogged}: Props) => {

    const pathname = usePathname();
    const router = useRouter();

    const menus = [
        {
            title: 'Accueil',
            href: '/',
        },
        {
            title: 'À propos',
            href: '/a-propos',
        },
        {
            title: 'Contact',
            href: '/contact'
        }
    ];
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (menuIsOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [menuIsOpen]);

    useEffect(() => {
        setMenuIsOpen(false);
    }, [pathname])

    return (
        <header className={'bg-white h-[100px] fixed top-0 left-0 right-0 z-30 flex items-center'}>
            {menuIsOpen && <div onClick={() => setMenuIsOpen(false)}
                                className={'fixed block md:hidden top-0 left-0 right-0 bottom-0 bg-black/80'}/>}
            <div className={'w-full h-full flex justify-between items-center pl-4'}>
                <div className={'md:flex-1'}>
                    <Link href={'/'} className={'cursor-pointer'}>
                        <Image src={'/logo_header.png'} width={0} height={0} className={'h-[56px] w-auto'} alt={''}
                               sizes={'100vw'}/>
                    </Link>
                </div>
                <button className={'block md:hidden mx-2 flex flex-col gap-3 relative'}
                        onClick={() => setMenuIsOpen(!menuIsOpen)}>
                    <span className={'inline-block w-[25px] h-[2px] bg-black'}></span>
                    <span className={'inline-block w-[25px] h-[2px] bg-black'}></span>
                    <AnimatePresence>
                        {menuIsOpen && <motion.div
                            initial={{
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                            }}
                            transition={{
                                type: "tween",
                                duration: '0.2'
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            className={'absolute w-[200px] right-0 bg-white p-4 rounded-[20px] origin-top-right'}>
                            <nav className={'flex flex-col justify-center md:hidden gap-3 items-center'}>
                                {menus.map((m, index) => <div
                                    key={`vitrine-header-menu-item-${index}`}
                                    className={`flex flex-col justify-center items-center`}>

                                    <Link
                                        href={m.href}
                                        className={`${pathname == m.href ? 'font-[600]' : ''}`}
                                    >
                                        {m.title}
                                    </Link>
                                </div>)}
                            </nav>
                            {!isLogged && <>
                                <button onClick={() => router.push("/inscription")}
                                        className={'button-rounded bg-white px-0 md:px-[12px] lg:px-[30px]'}>
                                    Inscription
                                </button>
                                <button onClick={() => router.push("/connexion")}
                                        className={'button-rounded bg-black text-white'}>
                                    Connexion
                                </button>
                            </>}

                            {isLogged && <div className={"px-2 flex items-center justify-center mt-2 gap-3 h-full lg:bg-secondary "}>
                                <Link
                                    href={"/app"}
                                    className={"button-rounded bg-black text-white text-[12px]"}
                                >
                                    Mon espace
                                </Link>
                            </div>}
                        </motion.div>}
                    </AnimatePresence>
                </button>
                <nav className={'hidden md:flex gap-3 items-center'}>
                    {menus.map((m, index) => <div
                        key={`vitrine-header-menu-item-${index}`}
                        className={`flex flex-col justify-center items-center`}>

                        <Link
                            href={m.href}
                            className={`${pathname == m.href ? 'font-[600]' : ''}`}
                        >
                            {m.title}
                        </Link>
                    </div>)}
                </nav>
                <div
                    className={
                        "hidden md:flex items-center justify-end overflow-hidden h-full flex-1"
                    }
                >
                    <div
                        className={
                            "w-20 h-full bg-secondary  hidden lg:block relative after:content-[''] after:absolute after:rotate-[35deg] after:w-[300px] after:h-[300px] after:bottom-0 after:right-2 after:bg-white"
                        }
                    />
                    {!isLogged && <div className={"px-2 flex items-center gap-3 h-full lg:bg-secondary "}>
                        <Link
                            href="/inscription"
                            className={"button-rounded bg-white px-0 md:px-[12px] lg:px-[30px]"}
                        >
                            Inscription
                        </Link>
                        <Link
                            href="/connexion"
                            className={"button-rounded bg-black text-white"}
                        >
                            Connexion
                        </Link>
                    </div>}
                    {isLogged && <div className={"px-2 flex items-center gap-3 h-full lg:bg-secondary "}>
                        <Link
                            href={"/app"}
                            className={"button-rounded bg-black text-white"}
                        >
                            Mon espace
                        </Link>
                    </div>}
                </div>
            </div>
        </header>
    )
}

export default Header;