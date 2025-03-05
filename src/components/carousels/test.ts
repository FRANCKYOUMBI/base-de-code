
const data = {
    "sem1": {
        "task1": {
            "a_ Type de labour": "type:select [Zero labour,Labour a plat, Labour profond, Billons] #required:true #visible:true",
            "b_ Espacement entre 2 plants en (m)": "type:number #required:true #visible:true",
            "c_ Espacement entre 2 lignes en (m)": "type:number #required:true #visible:true",
            "d_ Date de semis": "type:date #required:true #visible:true",
            "e_ Type de semence": "type:select [Hybride, Amelioree, Locale] #required:true #visible:true",
            "f_ Variété de semence": "type:comment #required:true #visible:true",
            "g_ Nombre de graines par poquet": "type:number #required:true #visible:true",
            "h_ Carre de densité": "type:number #required:true #visible:true",
            "i_ Taux de germination en (%)": "type:number #required:true #visible:true",
            "j_ Densite de semis": "type:number #required:true #visible:true",
            "k_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 1 (Semaine 1)"
    },
    "sem10": {
        " task1": {
            "a_ Vérifier la couleur des feuilles": "type:select [Vert fonce, Vert clair,Jaunatre, presence de rouille,presence de striure,Les bordures des feuilles sont marron] #required:true #visible:true",
            "b_ Vérifier s'il y a des attaques sur les feuilles et les tiges": "type:select [Feuilles et/ou tiges ronge,Presence de ravageurs,Aucun] #required:true #visible:true",
            "c_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 10 (Semaine 10)"
    },
    "sem11": {
        " task1": {
            "a_ Vérifier la couleur des feuilles": "type:select [Vert fonce, Vert clair,Jaunatre, presence de rouille,presence de striure,Les bordures des feuilles sont marron] #required:true #visible:true",
            "b_ Vérifier s'il y a des attaques sur les feuilles et les tiges": "type:select [Feuilles et/ou tiges ronge,Presence de ravageurs,Aucun] #required:true #visible:true",
            "c_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 11 (Semaine 11)"
    },
    "sem12": {
        " task1": {
            "a_ Vérifier la couleur des feuilles": "type:select [Vert fonce, Vert clair,Jaunatre, presence de rouille,presence de striure,Les bordures des feuilles sont marron] #required:true #visible:true",
            "b_ Vérifier s'il y  des attaques sur les feuilles et les tiges": "type:select [Feuilles et/ou tiges ronge,Presence de ravageurs,Aucun] #required:true #visible:true",
            "c_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 12 (Semaine 12)"
    },
    "sem2": {
        "task1": {
            "a_ Date de démariage": "type:date #required:true #visible:true",
            "b_ Date de premier Sarclage": "type:date #required:true #visible:true",
            "c_ Date première fertilisation": "type:date #required:true #visible:true",
            "d_ Type d'engrais utilisé(s)": "type:select [chimique,organique, les deux, aucun] #required:true #visible:true",
            "e_ Quantité d'engrais utilisée (NPK 20-10-10) en kg": "type:number #required:true #visible:true",
            "f_ Quantité d'engrais utilisée (Organique) en kg": "type:number #required:true #visible:true",
            "g_ Quantité d'engrais utilisée (Urée) en kg": "type:number #required:true #visible:true",
            "h_ Vérifier s'il y a des attaques sur les feuilles et les tiges": "type:select [Feuilles et/ou tiges ronge, Presence d'insectes,Aucun] #required:true #visible:true",
            "i_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 2 (Semaine 2)"
    },
    "sem3": {
        " task1": {
            "a_ Nombre de feuilles par plant": "type:number #required:true #visible:true",
            "b_ Taille des plants en (cm)": "type:number #required:true #visible:true",
            "c_ Vérifier la couleur des feuilles": "type:select [Vert fonce, Vert clair,Jaunatre, presence de rouille,presence de striure,Les bordures des feuilles sont marron] #required:true #visible:true",
            "d_ Vérifier s'il y a des attaques sur les feuilles et les tiges": "type:select [Feuilles et/ou tiges rongees,Presence de ravageurs,Aucun] #required:true #visible:true",
            "e_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 3 (Semaine 3)"
    },
    "sem4": {
        " task1": {
            "a_ Est-ce qu'il y a eu floraison?": "type:bool #required:true #visible:true",
            "b_ Vérifier la couleur des feuilles": "type:select [Vert fonce, Vert clair,Jaunatre, presence de rouille,presence de striure,Les bordures des feuilles sont marron] #required:true #visible:true",
            "c_ Vérifier s'il y a des attaques sur les feuilles et les tiges": "type:select [Feuilles et/ou tiges rongees,Presence de ravageurs,Aucun] #required:true #visible:true",
            "d_ Notes et Recommandations": "type:area #required:true #visible:true"
        },
        "title": "Descente 4 (Semaine 4)"
    },
}
function sortASC() {
    const orderedData = Object.fromEntries(
        Object.entries(data).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    );
    console.log(orderedData);
}