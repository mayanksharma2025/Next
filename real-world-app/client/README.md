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

✅ What you HAVE covered (good foundation)
✔ Core logic
graphqlFetch ✅
getTasks ✅
✔ Auth flow
loginAction ✅
✔ Basic UI
TaskForm ✅
Pagination ✅
✔ Task mutations (basic shape)
create/update/delete (mocked) ✅

👉 This is enough for interviews / basic production confidence
