import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Referans",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "İsim",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "projectType",
      title: "Proje Tipi",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Alıntı",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", validation: (r) => r.required() },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "rating",
      title: "Puan (1-5)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "order",
      title: "Sıralama (küçük sayı önce gösterilir)",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "projectType" },
  },
});
