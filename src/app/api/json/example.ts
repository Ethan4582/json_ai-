export const EXAMPLE_PROMPT = `Convert the following text into JSON based on the given schema:

TEXT: "John is 25 years old and studies computer science at university"

EXPECTED SCHEMA:
{
  "name": { "type": "string" },
  "age": { "type": "number" },
  "isStudent": { "type": "boolean" },
  "courses": {
    "type": "array",
    "items": { "type": "string" }
  }
}

ONLY return a valid JSON object in the expected format, nothing else.`;

export const EXAMPLE_ANSWER = `{
  "name": "John",
  "age": 25,
  "isStudent": true,
  "courses": ["computer science"]
}`;
