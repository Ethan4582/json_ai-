# AI-Powered Structured Data Converter

This project is a **TypeScript-based API** that converts unstructured data into structured JSON format using **Zod** for schema validation and **Gemini AI** for intelligent structuring. The API ensures strict type safety and seamless validation of transformed data.

## 🚀 FeaturesEthan4582- **Fully Type-Safe**: Built with TypeScript to ensure strict type checking.
- **Zod Validation**: Uses Zod to define and validate the expected data schema.
- **AI-Powered Transformation**: Utilizes Gemini AI to convert unstructured input into structured JSON.
- **Retry Mechanism**: Implements automatic retries for handling AI API failures.
- **Flexible Schema Handling**: Supports dynamic JSON schema conversion to ensure adaptability.
- **REST API Interface**: Provides a simple and efficient API endpoint for easy integration.

## 🛠️ Tech Stack

- **TypeScript**
- **Zod** (Schema Validation)
- **Gemini AI** (Google Generative AI API)
- **Next.js API Routes** (for backend handling)

## 📦 Installation

```sh
# Clone the repository
git clone https://github.com/Ethan4582/json_ai-

# Navigate to the project directory
cd json_ai

# Install dependencies
npm install
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

## 🚀 Running the Server

```sh
npm run dev
```

The API will be available at: `http://localhost:3000/api/json`

## 📌 API Usage

### **Endpoint:** `POST /api/json`

#### **Request Body:**
```json
{
  "data": "Unstructured text or data",
  "format": {
    "name": "string",
    "age": "number",
    "email": "string"
  }
}
```

#### **Response Example:**
```json
{
  "name": "John Doe",
  "age": 30,
  "email": "johndoe@example.com"
}
```


## 🛠️ Built With

- **Zod** - Schema validation
- **TypeScript** - Type safety
- **Google Generative AI** - AI transformation
- **Next.js** - API routing

## 📝 License

This project is licensed under the **MIT License**.

## 🎯 Future Enhancements

- Add caching for structured data
- Support more complex data types
- Improve AI prompt engineering for better accuracy