import { client } from "./client";

export type LocalizedText = { tr: string; en?: string };

export type SanityProject = {
  _id: string;
  title: LocalizedText;
  slug: { current: string };
  category: "living" | "bedroom" | "kitchen" | "office" | "furniture";
  coverImage: { asset?: { _ref: string } } | null;
  images: ({ asset?: { _ref: string } } | null)[] | null;
  description: LocalizedText | null;
  beforeImage: { asset?: { _ref: string } } | null;
  afterImage: { asset?: { _ref: string } } | null;
};

export type SanityTestimonial = {
  _id: string;
  name: string;
  projectType?: string;
  quote: LocalizedText;
  rating?: number;
};

const projectsQuery = `*[_type == "project"] | order(order asc, _createdAt desc){
  _id, title, slug, category, coverImage, images, description, beforeImage, afterImage
}`;

const testimonialsQuery = `*[_type == "testimonial"] | order(order asc, _createdAt desc){
  _id, name, projectType, quote, rating
}`;

const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id, title, slug, category, coverImage, images, description, beforeImage, afterImage
}`;

export async function getProjects(): Promise<SanityProject[]> {
  if (!client) return [];
  try {
    return await client.fetch(projectsQuery);
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  if (!client) return [];
  try {
    return await client.fetch(testimonialsQuery);
  } catch {
    return [];
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  if (!client) return null;
  try {
    return await client.fetch(projectBySlugQuery, { slug });
  } catch {
    return null;
  }
}
