import { getUserByUuid, updateUser } from "@/services/users";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

interface PropsParams {
    token: string;
}

interface Props {
    params: PropsParams;
}

interface JWTPayload {
    uuid: string;
    iat: number;
    exp: number;
}

export default async function ValidateAccount({ params: {token} }: Props) {
    let redirectUser = false;
    try {
        const decoded: JWTPayload = jwt.verify(token, process.env.SECRET_KEY || '') as JWTPayload;
        const user = await getUserByUuid(decoded.uuid);
        if (user && user.status === 'INACTIVE') {
            await updateUser(decoded.uuid, {
                status: 'ACTIVE'
            });
            redirectUser = true;
        }
    } catch(err) {
        console.log(err);
    }
    if (redirectUser) {
        redirect('/connexion?account=validated');
    }
    return (
        <main>
            <div className="container">
                <div className="px-[10px] md:px-[150px] py-[40px] lg:py-[90px]">
                    <div className="px-[10px] lg:px-[134px] py-[30px] lg:py-[60px]">
                        <h2
                            className="text-[#373737] text-[20px] 
                            lg:text-[30px] font-[700] text-center leading-[70px]"
                        >
                            Lien de validation de compte invalide ou expiré
                        </h2>
                    </div>
                </div>
            </div>
        </main>
  )
}
