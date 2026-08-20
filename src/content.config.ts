import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// 카테고리 트리(CategoryTree) 및 메인 위젯 분류에 사용하는 태그 목록
			tags: z.array(z.string()).default([]),
			// 소프로젝트 진행률 게이지(0~100). 생략하면 완료(100)로 간주
			completionRate: z.number().min(0).max(100).optional(),
		}),
});

export const collections = { blog };
