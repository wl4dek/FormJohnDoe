CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"email" varchar(255) NOT NULL,
	"color" varchar(50) NOT NULL,
	"observation" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_cpf_unique" UNIQUE("cpf")
);
