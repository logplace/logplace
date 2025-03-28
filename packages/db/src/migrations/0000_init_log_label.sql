CREATE TABLE "label" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(32) NOT NULL,
	"created_by" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "log" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar(64) NOT NULL,
	"description" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "log_label_record" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "log_label_record_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"log_id" varchar,
	"label_id" uuid
);
--> statement-breakpoint
ALTER TABLE "label" ADD CONSTRAINT "label_created_by_log_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."log"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_label_record" ADD CONSTRAINT "log_label_record_log_id_log_id_fk" FOREIGN KEY ("log_id") REFERENCES "public"."log"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_label_record" ADD CONSTRAINT "log_label_record_label_id_label_id_fk" FOREIGN KEY ("label_id") REFERENCES "public"."label"("id") ON DELETE no action ON UPDATE no action;