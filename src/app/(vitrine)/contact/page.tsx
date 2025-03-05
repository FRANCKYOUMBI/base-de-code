import { ContactForm } from "@/components/forms/FormModels";

export default function Contacts() {
    return (
        <main>
            <div
                className="bg-contact-page bg-black/50 h-[150px] md:h-[200px] lg:h-[500px] bg-center bg-cover px-[10px] lg:px-[70px] flex items-center justify-center">
                <div className="container">
                    <h2 className="text-[25px] lg:text-[64px] font-[900] uppercase text-white text-center">
                        Contactez-nous
                    </h2>
                </div>
            </div>
            <div className="container">
                <div className="px-[10px] md:px-[150px] py-[40px] lg:py-[90px]">
                    <div className="bg-pink px-[10px] lg:px-[134px] py-[30px] lg:py-[60px]">
                        <h3
                            className="text-[#373737] text-[20px] 
                            lg:text-[40px] font-[700] text-center leading-[70px]"
                        >
                            Complétez le formulaire
                        </h3>
                        <div className="mt-[10px] lg:mt-[20px]">
                            <ContactForm />
                        </div>
                    </div>
                    <hr className="w-full h-[2px] bg-black/50 mt-[30px]" />
                    <div className="flex justify-between lg:justify-center items-center lg:gap-[192px] mt-[65px]">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <img src="/telephon.svg" alt="phone-icon" className="w-[45px] lg:w-auto" />
                            <h6 className="text-[16px] lg:text-[20px] font-[500]">
                                <a href="tel://0033758025764">+(33) 7 58 02 57 64</a>
                            </h6>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <img src="/envelopp-p.svg" alt="email-icon" className="w-[45px] lg:w-auto" />
                            <h6 className="text-[16px] lg:text-[20px] font-[500]">
                                <a href="mailto:contact@vquariusvgency.com" target="new">Contact@vquariusvgency.com</a>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}