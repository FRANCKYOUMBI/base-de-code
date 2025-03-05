-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPEND', 'DELETE');

-- CreateEnum
CREATE TYPE "ShiftType" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- CreateEnum
CREATE TYPE "ReviewBy" AS ENUM ('HOTEL', 'EXTRA');

-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('PERFORM', 'WAITING', 'CONFIRM', 'EXECUTE', 'CANCEL', 'DONE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'HOTEL', 'EXTRA');

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "hotel_name" TEXT,
    "address" TEXT DEFAULT '',
    "identifiant" TEXT DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'EXTRA',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "image_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "missions" (
    "uuid" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "hours" INTEGER NOT NULL,
    "status" "MissionStatus" NOT NULL DEFAULT 'PERFORM',
    "shift_type" "ShiftType" NOT NULL DEFAULT 'MORNING',
    "hotel_id" TEXT NOT NULL,
    "accepted_by_id" TEXT,
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "missions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "mission_requested_extras" (
    "extra_id" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mission_requested_extras_pkey" PRIMARY KEY ("extra_id","mission_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "uuid" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "review_by" "ReviewBy" NOT NULL DEFAULT 'HOTEL',
    "review_value" INTEGER NOT NULL DEFAULT 0,
    "reviewText" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "trainings" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "storages" (
    "uuid" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storages_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "skills" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users_on_skills" (
    "user_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_on_skills_pkey" PRIMARY KEY ("user_id","skill_id")
);

-- CreateTable
CREATE TABLE "extra_bank_infos" (
    "uuid" TEXT NOT NULL,
    "rib" TEXT DEFAULT '',
    "paypal" TEXT DEFAULT '',
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "extra_bank_infos_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "documents" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "contacts" (
    "uuid" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "softwares" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "softwares_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "hotels_have_softwares" (
    "user_id" TEXT NOT NULL,
    "software_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotels_have_softwares_pkey" PRIMARY KEY ("user_id","software_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "missions_reference_key" ON "missions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "extra_bank_infos_user_id_key" ON "extra_bank_infos"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "softwares_name_key" ON "softwares"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "storages"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_accepted_by_id_fkey" FOREIGN KEY ("accepted_by_id") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mission_requested_extras" ADD CONSTRAINT "mission_requested_extras_extra_id_fkey" FOREIGN KEY ("extra_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mission_requested_extras" ADD CONSTRAINT "mission_requested_extras_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "missions"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "missions"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "storages"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_skills" ADD CONSTRAINT "users_on_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_skills" ADD CONSTRAINT "users_on_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra_bank_infos" ADD CONSTRAINT "extra_bank_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "storages"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels_have_softwares" ADD CONSTRAINT "hotels_have_softwares_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels_have_softwares" ADD CONSTRAINT "hotels_have_softwares_software_id_fkey" FOREIGN KEY ("software_id") REFERENCES "softwares"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
