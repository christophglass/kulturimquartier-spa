import { contentful } from "./contentful";
import { sharebuttons } from "./sharebuttons";

export const environment = {
    production: false,
    contentful: { ...contentful },
    sharebuttons: { ...sharebuttons }
};
