import { basics } from "./basics";
import { technology } from "./technology";
import { careFinance } from "./care-finance";
import type { Article, ArticleCluster } from "./types";

export type { Article, ArticleCluster };

export const articles: Article[] = [...basics, ...technology, ...careFinance];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const clusters: ArticleCluster[] = ["Basics", "Planning", "Technology", "Costs & finance", "Care & performance"];

export const readingMinutes = (a: Article) => Math.max(3, Math.round(a.body.split(/\s+/).length / 220));
