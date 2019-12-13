module.exports = {
    "extends": ["airbnb-typescript-prettier"],
    "overrides": [
        {
            "files": "**/*.{ts,tsx}",
            "rules": {
                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": "error"
            }
        }
    ],
    "parser": "@typescript-eslint/parser"
};
