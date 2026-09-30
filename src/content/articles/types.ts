export type ArticleCluster = "Basics" | "Technology" | "Costs & finance" | "Care & performance" | "Planning";

export interface Article {
  slug: string;
  title: string;
  /** ≤ 60 chars, used as the <title> */
  seoTitle: string;
  description: string;
  cluster: ArticleCluster;
  published: string;
  updated: string;
  /** 80–150 word factual answer shown in the "In short" block */
  summary: string;
  keyFacts: { k: string; v: string }[];
  body: string;
  faqs?: { q: string; a: string }[];
  related: string[];
}
