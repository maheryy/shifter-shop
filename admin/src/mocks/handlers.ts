import { rest } from "msw";

const handlers = [
  rest.get("/", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];

export default handlers;
