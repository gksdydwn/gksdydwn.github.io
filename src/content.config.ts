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
			// 대분류. 글 하나당 정확히 하나. 목록을 고정해 두어 오타를 빌드 단계에서 잡는다.
			// 분류를 늘리려면 아래 배열에 단어를 추가하면 되고, 줄이면 그 값을 쓰던 글을
			// 빌드가 이름과 함께 짚어준다.
			category: z.enum(['Study', 'Project', 'Interest']),
			// 소분류. 대분류와 달리 계속 늘어나는 성격이라 목록을 고정하지 않는다. 생략 가능.
			subcategory: z.string().optional(),
			// 검색용 꼬리표. 분류와 달리 글 하나가 여러 개를 가질 수 있다.
			tags: z.array(z.string()).default([]),
			// 소프로젝트 진행률 게이지(0~100). 생략하면 완료(100)로 간주
			completionRate: z.number().min(0).max(100).optional(),
		}),
});

export const collections = { blog };
