import { z } from "zod";

const Category = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
});

export type Category = z.infer<typeof Category>;

export default Category;
