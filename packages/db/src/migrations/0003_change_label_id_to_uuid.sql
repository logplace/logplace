ALTER TABLE "label" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "label" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "label" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "log_label_record" ALTER COLUMN "label_id" SET DATA TYPE uuid;