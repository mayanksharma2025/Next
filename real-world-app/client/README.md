npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest

npm install --save-dev jest ts-jest @types/jest \
@testing-library/react @testing-library/jest-dom @testing-library/user-event \
identity-obj-proxy

npm install --save-dev jest-environment-jsdom

import type { Config } from "jest";

const config: Config = {
preset: "ts-jest",
testEnvironment: "jsdom",
moduleNameMapper: {
"^@/(.\*)$": "<rootDir>/$1",
},
};

export default config;
