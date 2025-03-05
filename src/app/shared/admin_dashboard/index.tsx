"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import welcomeImg from "@public/shop-illustration.png";
import { UserList } from "@/services/types/user";
import { getTheCurrentUser } from "@/app/shared/users/user-list/actions";
import HandWaveIcon from "@/components/icons/hand-wave";
import WelcomeBanner from "@/app/[lang]/(hydrogen)/widgets/banners/welcome";

export default function AdminDashboard() {
  const [user, setUser] = useState<UserList | null>(null); // 🔥 Définit l'état utilisateur

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupère l'utilisateur
        const userData = await getTheCurrentUser();
        if ("firstName" in userData && "lastName" in userData) {
          setUser(userData as UserList);
          console.log("User Data:", userData); 
        } else {
          console.error("Erreur lors de la récupération de l'utilisateur :", userData);
        }
      } catch (error) {
        console.error("Erreur inattendue :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <WelcomeBanner
          title={
            <>
              Bienvenue {user ? `${user.firstName} ${user.lastName}` : ""}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>  
          }
          description={
            "Voici ce qui se passe dans votre magasin aujourd'hui. Regardez les statistiques en une seule fois."
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="flex flex-col items-start justify-center @2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 py-6 px-4 @4xl:col-span-2 @7xl:col-span-12 dark:bg-gray-100/30 flex flex-row items-center gap-4"
        >
        </WelcomeBanner>
      </div>
    </div>
  );
}
