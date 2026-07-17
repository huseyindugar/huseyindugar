import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kategori Adı",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (r) => r.required() },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug (otomatik üretilir)",
      type: "slug",
      options: { source: "title.tr", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Sıralama (küçük sayı önce gösterilir)",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title.tr" },
  },
});
