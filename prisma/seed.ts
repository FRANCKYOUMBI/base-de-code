import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { fr } from 'date-fns/locale';

const prisma = new PrismaClient()
const softwares = [
    "FOLS",
    "FOLS MOBILE",
    "OPERA",
    "HOT SOFT"
];

const skills = [
    "Excel",
    "Word",
    "Google",
    "Gestion App",
    "Windows"
];

async function main() {
    let user  = await prisma.user.findFirst({
        where: {
            email: `wambakevin7+admin@gmail.com`
        }
    });
    if(!user){
        await prisma.user.create({
            data: {
                email: "wambakevin7+admin@gmail.com",
                password: await hash("Kevmax123", 12),
                phoneNumber: "237690000000",
                firstName: "Kevin",
                lastName: "Wamba",
                role: "ADMIN"
            }
        });
    }

    // Create 5 admin users
    for (let i = 0; i < 10; i++) {
        let email = faker.internet.email();
        user  = await prisma.user.findFirst({
            where: { email }
        });
        if(!user){
            await prisma.user.create({
                data: {
                    email,
                    password: await hash("Kevmax123", 12),
                    phoneNumber: faker.phone.number("06########"),
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    role: "ADMIN",
                    identifiant: faker.person.jobType(),
                }
            });
        }
    }


    user  = await prisma.user.findFirst({
        where: {
            email: `wambakevin7+extra@gmail.com`
        }
    });
    if(!user){
        await prisma.user.create({
            data: {
                email: "wambakevin7+extra@gmail.com",
                password: await hash("Kevmax123", 12),
                phoneNumber: "237690000000",
                firstName: "Extra",
                lastName: "Test",
                role: "EXTRA",
                identifiant: "Etudiant"
            }
        });
    }

    // Create 10 extras users
    for (let i = 0; i < 10; i++) {
        let email = faker.internet.email();
        user  = await prisma.user.findFirst({
            where: { email }
        });
        if(!user){
            await prisma.user.create({
                data: {
                    email,
                    password: await hash("Kevmax123", 12),
                    phoneNumber: faker.phone.number("06########"),
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    role: "EXTRA",
                    identifiant: faker.person.jobType(),
                }
            });
        }
    }

    user  = await prisma.user.findFirst({
        where: {
            email: `wambakevin7+hotel@gmail.com`
        }
    });
    if(!user){
        await prisma.user.create({
            data: {
                email: "wambakevin7+hotel@gmail.com",
                password: await hash("Kevmax123", 12),
                phoneNumber: "237690000000",
                hotelName: "Hotel Test",
                role: "HOTEL",
                identifiant: "VQUA-007A"
            }
        });
    }

    // Create 10 hotel users
    for (let i = 0; i < 10; i++) {
        let email = faker.internet.email();
        user  = await prisma.user.findFirst({
            where: { email }
        });
        if(!user){
            await prisma.user.create({
                data: {
                    email,
                    password: await hash("Kevmax123", 12),
                    phoneNumber: faker.phone.number("06########"),
                    hotelName: faker.company.name(),
                    role: "HOTEL",
                    identifiant: `VQUA-${faker.string.alphanumeric(4)}`,
                }
            });
        }
    }

    for (let i = 0; i < softwares.length; i++) {
        await prisma.software.upsert({
            where: { name: softwares[i] },
            update: {},
            create: {
                name: softwares[i],
            },
        })
    }

    for(let i = 0; i < skills.length; i++) {
        await prisma.skill.upsert({
            where: { name: skills[i] },
            update: {},
            create: {
                name: skills[i],
            },
        })
    }

    for (let i = 0; i < 10; i++) {
        const training  = await prisma.training.findFirst({
            where: {
                name: `Formation ${i}`
            }
        });
        if(!training){

            const storage = await prisma.storage.create({
                data: {
                    fileName: faker.system.fileName()+".png",
                    url: faker.image.urlPicsumPhotos({width: 1600, height: 900}),
                    mimeType: "image/png",
                    width: 1600,
                    height: 900,
                    size: 100,
                },
            });
                    
            await prisma.training.create({
                data: {
                    name: `Formation ${i}`,
                    link: "https://youtu.be/Qjp7vGBxD0w",
                    imageId: storage.uuid,
                },
            });
        }
    }
    const hotelsUsers = await prisma.user.findMany({
        where: {
            role: "HOTEL"
        }
    });
    const extrasUsers = await prisma.user.findMany({
        where: {
            role: "EXTRA"
        }
    });
    for (let i = 0; i < hotelsUsers.length; i++) {
        // create 10 documets for each hotel
        for (let j = 0; j < 10; j++) {
            let file = +(faker.string.numeric({ length: { min: 1, max: 1 }, exclude: ['0', '5', '6', '7', '8', '9'] }));
            const storage = await prisma.storage.create({
                data: {
                    fileName: `${faker.system.fileName({extensionCount: 0})}.${file > 2 ? "docx" : "pdf"}`,
                    url: `https://files.vquariusvgency.com/develop/${file}.${file > 2 ? "docx" : "pdf"}`,
                    mimeType: file >  2 ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/pdf",
                    width: 0,
                    height: 0,
                    size: 100,
                },
            });
            await prisma.document.create({
                data: {
                    name: storage.fileName,
                    fileId: storage.uuid,
                    hotelId: hotelsUsers[i].uuid
                }
            });
        }
        // create 4 requested missions for each hotel
        for (let j = 0; j < 4; j++) {
            let reference = faker.string.alphanumeric(6).toLocaleUpperCase();
            let from = faker.date.between({from: "2023-06-01", to: "2023-12-31"})
            await prisma.mission.upsert({
                where: { reference },
                update: {},
                create: {
                    reference,
                    key: faker.string.alphanumeric(12).toLocaleUpperCase(),
                    from: from,
                    to: from,
                    hours: 8,
                    hotelId: hotelsUsers[i].uuid,
                    shiftType: "MORNING",
                    status: "WAITING",

                },
            })
        }
        // create 4 requested missions for each hotel
        for (let j = 0; j < 4; j++) {
            let reference = faker.string.alphanumeric(6).toLocaleUpperCase();
            let from = faker.date.between({from: "2023-06-01", to: "2023-12-31"})
            await prisma.mission.upsert({
                where: { reference },
                update: {},
                create: {
                    reference,
                    key: faker.string.alphanumeric(12).toLocaleUpperCase(),
                    from: from,
                    to: from,
                    hours: 8,
                    hotelId: hotelsUsers[i].uuid,
                    shiftType: "MORNING",
                    status: "WAITING",
                },
            });
        }
        // create 4 accept missions for each hotel
        for (let j = 0; j < 4; j++) {
            let reference = faker.string.alphanumeric(6).toLocaleUpperCase();
            let from = faker.date.between({from: "2023-06-01", to: "2023-12-31"})
            await prisma.mission.upsert({
                where: { reference },
                update: {},
                create: {
                    reference,
                    key: faker.string.alphanumeric(12).toLocaleUpperCase(),
                    from: from,
                    to: from,
                    hours: 4,
                    hotelId: hotelsUsers[i].uuid,
                    shiftType: "AFTERNOON",
                    status: "CONFIRM",
                    acceptedById: extrasUsers[+faker.string.numeric(1)].uuid,
                    acceptedAt: from
                },
            });
        }
        // create 4 done missions for each hotel
        for (let j = 0; j < 4; j++) {
            let reference = faker.string.alphanumeric(6).toLocaleUpperCase();
            let from = faker.date.between({from: "2023-06-01", to: "2023-12-31"})
            await prisma.mission.upsert({
                where: { reference },
                update: {},
                create: {
                    reference,
                    key: faker.string.alphanumeric(12).toLocaleUpperCase(),
                    from: from,
                    to: from,
                    hours: 4,
                    hotelId: hotelsUsers[i].uuid,
                    shiftType: "EVENING",
                    status: "DONE",
                    acceptedById: extrasUsers[+faker.string.numeric(1)].uuid,
                    acceptedAt: from
                },
            });
        }
    
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })