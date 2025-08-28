CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"completed_at" date,
	"created_at" date DEFAULT now()
);
