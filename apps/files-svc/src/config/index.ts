import { config } from "dotenv";
import Handlebars from "handlebars";
import {
  formatDisplayDate,
  formatDisplayShortDate,
  formatPrice,
} from "utils/format";

config();

/* Handlebars helpers */
Handlebars.registerHelper("formatPrice", formatPrice);
Handlebars.registerHelper("formatDisplayDate", formatDisplayDate);
Handlebars.registerHelper("formatDisplayShortDate", formatDisplayShortDate);
