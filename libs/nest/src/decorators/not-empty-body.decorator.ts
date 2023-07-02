import { UsePipes } from "@nestjs/common";
import { NotEmptyBodyPipe } from "../pipes";

export const NotEmptyBody = () => UsePipes(NotEmptyBodyPipe);
