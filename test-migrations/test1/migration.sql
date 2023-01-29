-- AlterTable
ALTER TABLE "db_details" DROP CONSTRAINT "db_details_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "pmc_errors" JSON,
ADD CONSTRAINT "db_details_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "db_details_api_key_id_db_name_db_host_idx" ON "db_details"("api_key_id", "db_name", "db_host");
