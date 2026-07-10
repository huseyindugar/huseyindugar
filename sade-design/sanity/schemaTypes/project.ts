import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (r) => r.required() },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.tr", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Salon", value: "living" },
          { title: "Yatak Odası", value: "bedroom" },
          { title: "Mutfak", value: "kitchen" },
          { title: "Ofis", value: "office" },
          { title: "Özel Mobilya", value: "furniture" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Ek Görseller",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "beforeImage",
      title: "Öncesi (opsiyonel)",
      type: "image",
    }),
    defineField({
      name: "afterImage",
      title: "Sonrası (opsiyonel)",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Sıralama (küçük sayı önce gösterilir)",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title.tr", category: "category", media: "coverImage" },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
});
