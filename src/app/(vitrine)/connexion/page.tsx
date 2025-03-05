import { LoginForm, SocialLogin } from "@/components/forms/FormModels";
import Link from "next/link";

export default function Connexion() {


    return (
        <main className="bg-pink/60">
            <div className="bg-login-bg bg-fixed bg-center bg-cover px-[20px] md:px-[40px] pt-[50px] md:pt-[100px] pb-[100px] md:pb-[198px]">
                <div className="container max-w-[500px]">
                    <div className="mb-[40px]">
                        <h2 className="text-center font-[700] text-[35px] md:text-[45px] lg:text-[60px] leading-[45px] md:leading-[60px] lg:leading-[70px] text-[#373737]">
                            Connexion
                        </h2>
                        <p className="text-center font-[400] text-[20px] leading-[25px] text-[#373737]">
                            Contents de vous revoir !! Entrez vos identifiants
                        </p>
                    </div>
                    <LoginForm />
                    <div className="mt-[50px] mb-[30px]">
                        <h5 className="text-center">Ou</h5>
                        <hr className="w-full h-[2px] bg-black/50" />
                    </div>
                    <SocialLogin />
                    <div className="text-center mt-[65px]">
                        <Link
                            href='/inscription'
                            className="underline text-[20px] font-[400] leading-[25px] hover:text-primary transition-all ease-in-out duration-[0.5s] w-full"
                        >
                            Vous n’avez pas encore de compte ? Créez en un ici
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
