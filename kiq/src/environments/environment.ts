import { contentful } from "./contentful";
import { sharebuttons } from "./sharebuttons";

export const environment = {
    production: true,
    contentful: { ...contentful },
    sharebuttons: { ...sharebuttons }
};
