import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({
      name: "photoStripImages",
      title: "Giriş Foto Şeridi (3 görsel)",
      description:
        "Ana sayfada logonun hemen altındaki fotoğraf kolajı. Sıra: 1. görsel soldaki büyük alan, 2. görsel sağ üst, 3. görsel sağ alt.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "stats",
      title: "Rakamlarla Sade Design (istatistikler)",
      description:
        "Güven bölümündeki sayılar. Her satır: değer (ör. 40+) ve etiket (ör. Tamamlanan Proje).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Değer",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "label",
              title: "Etiket",
              type: "object",
              fields: [
                { name: "tr", title: "Türkçe", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label.tr" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
