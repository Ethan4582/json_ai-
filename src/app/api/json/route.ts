import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z, ZodTypeAny } from "zod";
import { EXAMPLE_ANSWER, EXAMPLE_PROMPT } from "./example";

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const deteminshcmeaType = (schema: any) => {
   if (!schema.hasOwnProperty("type")) {
      return Array.isArray(schema) ? "array" : typeof schema;
   }
   return schema.type;
};

const jsonToSchemaToZod = (schema: any): ZodTypeAny => {
   const type = deteminshcmeaType(schema);
   switch (type) {
      case "string": return z.string().nullable();
      case "number": return z.number().nullable();
      case "boolean": return z.boolean().nullable();
      case "array": return z.array(jsonToSchemaToZod(schema.items)).nullable();
      case "object":
         const shape: Record<string, ZodTypeAny> = {};
         for (const key in schema) {
            if (key !== "type") {
               shape[key] = jsonToSchemaToZod(schema[key]);
            }
         }
         return z.object(shape);
      default:
         throw new Error(`Unsupported data type: ${type}`);
   }
};

export const POST = async (req: NextRequest) => {
   const body = await req.json();

   const genericSchema = z.object({
      data: z.string(),
      format: z.object({}).passthrough(),
   });

   const { data, format } = genericSchema.parse(body);
   const dynamicSchema = jsonToSchemaToZod(format);

   type PromiseExecuter<T> = (resolve: (value: T) => void, reject: (reason?: any) => void) => void;

   class RetryablePromise<T> extends Promise<T> {
      static async retry<T>(retries: number, executer: PromiseExecuter<T>): Promise<T> {
         return new Promise((resolve, reject) => {
            const attempt = (remainingRetries: number) => {
               new Promise(executer)
                  .then(resolve)
                  .catch((error) => {
                     console.log(`Retrying due to error: ${error}`);
                     if (remainingRetries > 0) {
                        attempt(remainingRetries - 1);
                     } else {
                        reject(error);
                     }
                  });
            };
            attempt(retries);
         });
      }
   }

   const validationResult = await RetryablePromise.retry<object>(3, async (resolve, reject) => {
      try {
         const content = `DATA: \n"${data}\n\n-----------\nExpected ${JSON.stringify(format, null, 2)}\n\n-----------\nValid JSON output in expected format:`;

         const res = await model.generateContent(content);
         const text = res.response.text().trim();

         if (!text) {
            throw new Error("Empty response from Gemini API");
         }

         console.log("Gemini Response:", text);

         const parsedRes = JSON.parse(text);
         const validationResult = dynamicSchema.parse(parsedRes);
         resolve(validationResult);
      } catch (error) {
         reject(error);
      }
   });

   return NextResponse.json({ validationResult, status: 200 });
};