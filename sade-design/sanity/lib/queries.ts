import { client } from "./client";
import { staticProjects } from "@/content/projects";

export type LocalizedText = { tr: string; en?: string };

export type ImageRef = { asset?: { _ref: string } } | string | null;

export type SanityProject = {
  _id: string;
  title: LocalizedText;
  slug: { current: string };
  category: "living" | "bedroom" | "kitchen" | "office" | "furniture";
  coverImage: ImageRef;
  images: ImageRef[] | null;
  description: LocalizedText | null;
  beforeImage: ImageRef;
  afterImage: ImageRef;
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

function staticProjectsAsSanityProjects(): SanityProject[] {
  return staticProjects.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    coverImage: p.coverImage,
    images: p.images,
    description: p.description,
    beforeImage: null,
    afterImage: null,
  }));
}

export async function getProjects(): Promise<SanityProject[]> {
  if (!client) return staticProjectsAsSanityProjects();
  try {
    const results = await client.fetch(projectsQuery);
    return results.length > 0 ? results : staticProjectsAsSanityProjects();
  } catch {
    return staticProjectsAsSanityProjects();
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
  if (client) {
    try {
      const result = await client.fetch(projectBySlugQuery, { slug });
      if (result) return result;
    } catch {
      // fall through to static content
    }
  }
  return staticProjectsAsSanityProjects().find((p) => p.slug.current === slug) ?? null;
}
