import { contentful } from "./contentful";

export const environment = {
    production: false,
    contentful: { ...contentful }
};
