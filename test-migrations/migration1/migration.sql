ALTER INDEX "public"."db_details_api_key_id_db_name_db_host_idx" RENAME TO "db_name_idx";

ALTER TABLE IF EXISTS "db_details_api_key_id_db_name_db_host_idx" RENAME TO "db_name_idx";