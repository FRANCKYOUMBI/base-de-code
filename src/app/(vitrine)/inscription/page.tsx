import Link from "next/link";

export default function Inscription() {
    return (
        < main className="bg-inscription-page opacity-[80%] px-[10px] md:px-[50px] lg:px-[430px] xl:[500px] pt-[45px] pb-[200px]" >
            <div className="container">
                <div
                    className="bg-white p-[30px] md:p-[45px] lg:p-[45px] rounded-[20px] shadow-inscription-card flex flex-col md:flex-row justify-between items-center gap-[20px] md:gap-[auto]"
                >
                    <div className="bg-inscription-hotel h-[150px] lg:h-[220px] border-solid border-[6px] border-[#B9B9B9] w-[150px] lg:w-[220px] bg-cover bg-center rounded-[100%]">
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="text-[20px] md:text-[28px] font-[700] leading-[28px] md:leading-[50px] text-center">
                                je m’inscris comme
                            </h5>
                            <h1 className="text-[28px] md:text-[40px] font-[900] leading-[40px] md:leading-[50px] text-center">Hôtel</h1>
                        </div>
                        <Link className="w-full py-[10px] text-[22px] font-[600] md:py-[14px] bg-[#181818] text-white text-center rounded-[20px] mt-[17px] hover:bg-[#000000] transition-all ease-in-out duration-[0.5s]" href="/inscription-hotel">
                            Incription
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-[30px] md:p-[45px] lg:p-[45px] rounded-[20px] shadow-inscription-card flex flex-col md:flex-row justify-between items-center gap-[20px] md:gap-[auto] mt-[47px]">
                    <div className="bg-inscription-extra h-[150px] lg:h-[220px] border-solid border-[6px] border-[#B9B9B9] w-[150px] lg:w-[220px] bg-cover bg-center rounded-[100%]">
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="text-[20px] md:text-[28px] font-[700] leading-[28px] md:leading-[50px] text-center">
                                je m’inscris comme
                            </h5>
                            <h1 className="text-[28px] md:text-[40px] font-[900] leading-[40px] md:leading-[50px] text-center">Extra</h1>
                        </div>
                        <Link className="w-full py-[10px] text-[22px] font-[600] md:py-[14px] bg-[#181818] text-white text-center rounded-[20px] mt-[17px] hover:bg-[#000000] transition-all ease-in-out duration-[0.5s]" href="/inscription-extra">
                            Incription
                        </Link>
                    </div>
                </div>
            </div>
        </main >
    )
}