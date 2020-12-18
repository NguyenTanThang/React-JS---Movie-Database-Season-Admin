const languageCodes = [
    {
        "code": "zh",
        "name": "Chinese"
    },
    {
        "code": "es",
        "name": "Spanish"
    },
    {
        "code": "en",
        "name": "English"
    },
    {
        "code": "hi",
        "name": "Hindi"
    },
    {
        "code": "ar",
        "name": "Arabic"
    },
    {
        "code": "bn",
        "name": "Bengali"
    },
    {
        "code": "pt",
        "name": "Portuguese"
    },
    {
        "code": "ru",
        "name": "Russian"
    },
    {
        "code": "ja",
        "name": "Japanese"
    },
    {
        "code": "id",
        "name": "Indonesian"
    },
    {
        "code": "vi",
        "name": "Vietnamese"
    },
].sort((a, b) => a.name.localeCompare(b.name))

export default languageCodes;