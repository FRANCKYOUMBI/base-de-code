import Image from "next/image"
import Link from "next/link";

export default async function Home() {


    return (
        <main className="">
            <section className={"h-[700px] w-full bg-home_section_1 bg-cover bg-no-repeat bg-center relative"}>
                <div className={'container flex justify-center items-end h-full'}>
                    <div className={'flex flex-col items-center gap-10 mb-40'}>
                        <h3 className={'max-w-[977px] px-3 text-white text-[38px] md:text-[44px] text-center font-bold uppercase'}>
                            recrutez et gérez des extras en un clic
                        </h3>
                        <p className={'text-center uppercase text-sm md:text-xl  text-white max-w-[500px]'}>
                            une solution digitale rapide et efficace pour recruter des réceptionnistes qualifiés
                        </p>
                    </div>
                </div>
                <Link href={'/connexion'} draggable={false}>
                    <button
                        className={'absolute uppercase button-rounded text-primary font-bold translate-x-1/2 right-1/2 bottom-0 translate-y-1/2 text-[16px] sm:text-[25px] bg-white px-8 sm:px-16 py-5 min-w-max'}>
                        je me connecte
                    </button>
                </Link>
            </section>
            <section className={'py-28'}>
                <h4 className={'text-black text-[22px] md:text-[28px] font-[800] max-w-[1000px] mx-auto text-center'}>
                    La solution efficace pour combler vos besoins en réceptionnistes temporaires
                </h4>
                <p className={'max-w-[965px] text-center text-lg mt-3 mx-auto'}>
                    Nous vous aidons à trouver le réceptionniste idéal pour votre entreprise.<br />
                    Que vous ayez besoin d'un remplacement temporaire ou d'un renfort ponctuel, notre plateforme
                    simplifiée vous permet de trouver rapidement et facilement des réceptionnistes qualifiés pour
                    répondre à vos besoins
                </p>
            </section>


            <section className={'relative'}>
                <div className={"bg-[url('/golden-bell-hotel.jpg')] bg-no-repeat bg-cover bg-center h-[350px] block md:hidden"} />
                <div className={'absolute hidden md:block h-full w-full'}>
                    <div className={'container flex gap-8 h-full w-full pb-12'}>
                        <div className={'flex-1 pb-5'}>
                            <div className={"flex-1 h-full pb-5 bg-[url('/golden-bell-hotel.jpg')] bg-cover bg-center bg-no-repeat rounded-[15px]"} />
                            {/* <Image src={'/golden-bell-hotel.jpg'} alt={''} height={0} width={0} sizes={'100vw'} */}
                            {/*       className={'rounded-[15px] h-full w-full'}/> */}
                        </div>
                        <div className={'flex-1'}>

                        </div>
                    </div>
                </div>
                <div className={'container flex'}>
                    <div className={'hidden md:block flex-1'} />
                    <h4 className={'flex-1 text-[22px] md:text-[28px] text-primary font-bold'}>
                        Une solution fiable pour<br />
                        les hôteliers
                    </h4>
                </div>
                <div className={'w-full bg-primary pb-12'}>
                    <div className={'container flex gap-16 items-center max-h-min py-6'}>
                        <div className={'hidden md:block flex-1'} />
                        <div className={'flex-1'}>
                            <ul className={'list-disc text-lg text-white flex flex-col gap-3 pl-4'}>
                                <li>Requête en ligne via la plateforme</li>
                                <li>Un Extra affecté sous 48H maximum</li>
                                <li>Documents de l’Extra automatiquement transférés à l’hôtel.</li>
                                <li>Adresse de l’hôtel transmis à l’Extra</li>
                                <li>Récapitulatif des missions précédentes et celles à venir.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'relative md:mt-36'}>
                <div className={"bg-[url('/receptionists-elegant-suits-during-work-hours.jpg')] bg-no-repeat bg-cover bg-center h-[350px] block md:hidden"} />
                <div className={'absolute hidden md:block h-full w-full'}>
                    <div className={'container flex gap-8 h-full w-full pb-12'}>
                        <div className={'flex-1'} />
                        <div className={"flex-1 pb-5 bg-[url('/receptionists-elegant-suits-during-work-hours.jpg')] bg-cover bg-center bg-no-repeat rounded-[15px]"} />
                    </div>
                </div>
                <div className={'container flex'}>
                    <div className={'hidden md:block flex-1 order-1'} />
                    <h4 className={'flex-1 text-[22px] md:text-[28px] text-primary font-bold'}>
                        Un atout pour les<br /> réceptionnistes Extras
                    </h4>
                </div>
                <div className={'w-full bg-primary pb-12'}>
                    <div className={'container flex gap-16 items-center max-h-min py-6'}>
                        <div className={'hidden md:block flex-1 order-2'} />
                        <div className={'flex-1 order-1 pl-4'}>
                            <ul className={'list-disc text-lg text-white flex flex-col gap-3'}>
                                <li>Processus d’intégration simplifié</li>
                                <li>Des missions régulières et bien rémunérées</li>
                                <li>Des vidéos de formation accessibles</li>
                                <li>Système de Parrainage avantageux</li>
                                <li>Récapitulatif des missions effectuées et à venir</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'text-black my-[100px]'}>
                <div className={'container text-center flex flex-col items-center'}>
                    <h4 className={'text-[22px] md:text-[28px] font-bold mb-4'}>Une interface simple et intuitive</h4>
                    <p className={'text-lg mb-20 max-w-[700px] m-auto'}> Une fois connecté, vous serez accueilli par une interface propre
                        et bien organisée qui met en
                        avant les fonctionnalités clés de l'application.</p>
                    <Image draggable={false} src={'/page_builder_tease.png'} alt={''} height={0} width={0}
                        className={'h-auto w-auto select-none'} sizes={'100vw'} />
                </div>
            </section>

            <section className={'bg-secondary mt-32 relative'}>
                <div className="container flex px-4">
                    <div className={'flex-1 flex flex-col gap-5 p-6'}>
                        <h4 className={'text-[22px] md:text-[28px] font-bold text-white'}>
                            Des vidéos de formation sur les procédures
                        </h4>
                        <div className={'h-2 w-full bg-white rounded-[20px]'} />
                        <ul className={'list-none text-lg text-white'}>
                            <li>Les logiciels de gestion (Fols, ...)</li>
                            <li>Les procédures de réservation</li>
                            <li>Les procédures de Check-in</li>
                            <li>Les TPE</li>
                        </ul>
                    </div>
                    <div className={"flex-1 bg-[url('/youtube_logo_giant.jpg')] hidden md:block bg-cover bg-center bg-no-repeat rounded-[20px] -my-8"} />
                </div>
            </section>
            <div className={'-my-6 px-3 block md:hidden'}>
                <Image src={'/youtube_logo_giant.jpg'} alt={''} height={0} draggable={false}
                    width={0} sizes={'100vw'} className={'rounded-[20px] m-auto w-[350px] relative h-auto flex-1 z-10 select-none'} />
            </div>
            <section className={'my-32'}>
                <div className={'container mx-auto'}>
                    <div
                        className={'bg-black rounded-[20px] h-[150px] max-w-[600px] mx-auto flex items-center overflow-hidden'}>
                        <div className={'max-w-max px-10'}>
                            <p className={'text-[12px] sm:text-sm md:text-lg text-white'}>
                                En savoir plus sur <br />
                                <span className={'uppercase font-black'}>VQUARIUS VGENCY ?</span>
                            </p>
                        </div>
                        <div className={'flex-1 flex w-full h-full justify-end'}>
                            <div
                                className={" relative flex items-center justify-center h-full w-9/12 bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[35deg] before:w-[180px] before:h-[180px] before:top-0 before:left-0 before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                                <Link href="/contact" className="button-rounded bg-black text-white z-[2] text-[12px] sm:text-sm md:text-lg font-bold block">
                                        CONTACTEZ-NOUS
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
