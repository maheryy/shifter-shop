import { z } from "zod";

const Category = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});

export type Category = z.infer<typeof Category>;

export default Category;
