import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards";

export const Auth = () => UseGuards(AuthGuard);
