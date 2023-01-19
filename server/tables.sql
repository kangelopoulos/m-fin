CREATE TABLE  public.uploads (
  "_id" serial NOT NULL,
  "date" date NOT NULL,
  "csv1" varchar NOT NULL,
  "csv2" varchar NOT NULL,
  "csv3" varchar NOT NULL,
  CONSTRAINT "uploads_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

INSERT INTO public.uploads(date, csv1, csv2, csv3) VALUES ("1-10-2022", "one.csv", "two.csv", "three.csv");