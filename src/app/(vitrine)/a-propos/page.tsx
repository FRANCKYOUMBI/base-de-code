import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function Page() {

    const images = [
        '/novotel_logo.png',
        '/ibis_logo_red.png',
        '/best_western_logo.png',
        '/adiago_logo.png'
    ]

    return (
        <main className="">
            <section
                className={'bg-about_page_section_1 h-[500px] bg-center bg-cover bg-no-repeat flex items-center justify-center'}>
                <h3 className={'text-[45px] text-white font-bold'}>VQUARIUS VGENCY</h3>
            </section>
            <section>
                <div className={'container mx-auto py-24'}>
                    <h4 className={'text-[24px] md:text-[28px] text-black font-[800] text-center'}>
                        A propos de nous :
                    </h4>
                    <p className={'text-[16px] md:text-lg text-center mt-12'}>
                        VQUARIUS VGENCY est une agence digitale constituée de jeunes talents qui propose des solutions
                        sur
                        mesure pour aider nos clients à atteindre leurs objectifs, en combinant technologie et
                        créativité.
                        <br/>
                        <br/>
                        Chez VQUARIUS VGENCY, nous comprenons les défis auxquels l'industrie hôtelière est confrontée en
                        matière de recrutement de personnel d’appui. C’est pourquoi nous mettons à votre disposition un
                        réseau de réceptionnistes qualifiés et assidus, via une solution digitale simple et accessible à
                        tous. En 3 clics votre requête est émise, et un personnel vous est attribué dans les 48 heures
                        maximum.
                    </p>
                </div>
            </section>
            <section>
                <div className={'bg-pink p-3'}>
                    <h4 className={'text-[24px] md:text-[28px] text-black font-[800] text-center px-4'}>
                        Nos partenaires
                    </h4>
                </div>
                <div className={'py-16'}>
                    <Marquee
                        autoFill={true}
                    >
                        {images.map(i => <img
                            draggable={false}
                            src={i}
                            height={0}
                            width={0}
                            alt={''}
                            className={'mx-3 h-[170px] select-none w-auto'}/>)}
                    </Marquee>
                </div>
            </section>
            <section className={'bg-about_page_section_4'}>
                <div className={'container'}>
                    <h4 className={'text-primary font-[800] py-6 text-center text-[24px] md:text-[28px] px-4'}>L’équipe VQUARIUS</h4>
                    <div className={'flex flex-wrap items-center justify-center gap-10 container'}>
                        {
                            Array(3).fill(0).map((_, i) => <div>
                                    <div
                                        style={{
                                            background: `url('team_${i + 1}.jpg') no-repeat top/cover`
                                        }}
                                        className={`h-[150px] w-[150px] rounded-full m-auto`}
                                    />
                                    <div className={'mx-3 flex flex-col items-center mt-5'}>
                                        <p className={'text-lg'}>Roberto Nengoué</p>
                                        <p className={'text-lg font-[800]'}>CEO</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={'container mx-auto my-24'}>
                    <div
                        className={'bg-black rounded-[20px] h-[150px] max-w-[600px] mx-auto flex items-center overflow-hidden'}>
                        <div className={'max-w-max px-10'}>
                            <p className={'text-[12px] sm:text-sm md:text-lg text-white'}>
                                En savoir plus sur <br/>
                                <span className={'uppercase font-black'}>VQUARIUS VGENCY ?</span>
                            </p>
                        </div>
                        <div className={'flex-1 flex w-full h-full justify-end'}>
                            <div
                                className={" relative flex items-center justify-center h-full w-9/12 bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[35deg] before:w-[180px] before:h-[180px] before:top-0 before:left-0 before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                                <button className={'button-rounded bg-black text-white z-[2] text-[12px] sm:text-sm md:text-lg font-bold'}>
                                    CONTACTEZ-NOUS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}