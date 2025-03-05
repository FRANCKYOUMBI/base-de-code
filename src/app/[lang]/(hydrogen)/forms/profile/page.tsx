"use client";

import { Button } from "rizzui";
import { routes } from "@/config/routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, UserList } from "@/services/types/user";
import AccountForm from "@/app/shared/users/account-form";
import { getProfile } from "./action";
import PageHeader from "@/components/page-header";
import { User as UserIcon, Mail, ShieldIcon, CheckCircle2, XCircle2, UserSquare2, Loader2 } from "lucide-react"; // Import des icônes

const pageHeader = {
  title: "Mon Compte",
  breadcrumb: [
    {
      href: routes.admin,
      name: "Accueil",
    },
    {
      name: "Mon Compte",
    },
  ],
};

export default function MyAccountPage() {

  const [user, setUser] = useState<UserList | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const loadPurchaseData = async () => {



      try {
        setIsLoading(true);
        const result = await getProfile();
        //@ts-ignore
        setUser(result as User);
      } catch (error) {
        console.error('Error loading purchase:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPurchaseData();
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Retour à l'Accueil
          </Button>
        </Link>
      </PageHeader>

      {user ? (
        <>
          {/* Section des détails */}
          {!isEditing && (
            <div className=" p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Informations du compte</h2>
              <div className="space-y-4">
                {/* Prénom */}
                <div className="flex items-center space-x-3">
                  <UserSquare className="w-5 h-5 text-gray-500" />
                  <div>
                    <label className="text-sm text-gray-500">Prénom</label>
                    <p className="font-medium">{user.firstName}</p>
                  </div>
                </div>

                {/* Nom */}
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <label className="text-sm text-gray-500">Nom</label>
                    <p className="font-medium">{user.lastName}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                {/* Rôle */}
                <div className="flex items-center space-x-3">
                  <ShieldIcon className="w-5 h-5 text-gray-500" />
                  
                  <div>
                    <label className="text-sm text-gray-500">Rôle</label>
                    <p className="font-medium">{user.role === "admin" ? "Administrateur" : user.role === "manager" ? "Responsable" : "Vendeur(se)"}</p>
                  </div>
                </div>

                {/* Statut */}
                <div className="flex items-center space-x-3">
                  {user.activated ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle2 className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <label className="text-sm text-gray-500">Statut</label>
                    <p className="font-medium">
                      {user.activated ? "Activé" : "Désactivé"}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleEditClick}
                className="mt-6"
                variant="outline"
              >
                Modifier mes informations
              </Button>
            </div>
          )}

          {/* Section de modification */}
          {isEditing && (<>
            <AccountForm
              user={user}
              onCancel={() => setIsEditing(false)} // Annuler et revenir à l'affichage des détails
            />

          </>
          )}
        </>
      ) : (
        !isLoading ? <div>Aucune donnée utilisateur trouvée.</div> : <div className="w-full flex justify-center animate-spin size-8"><Loader2 /></div>
      )}
    </>
  );
}