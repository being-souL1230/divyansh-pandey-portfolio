import { z } from 'zod';
import { insertContactSchema, projects, skills } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills' as const,
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
};
