import { contentful } from "./contentful";

export const environment = {
    production: true,
    contentful: { ...contentful }
};
