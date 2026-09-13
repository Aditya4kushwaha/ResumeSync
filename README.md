# ResumeSync

ResumeSync is a premium, AI-powered ATS resume optimizer and comparison platform. It is designed to align your resume with target job descriptions, discover keyword gaps, generate tailored interview preparation questions, and output optimized, ATS-friendly documents in seconds.

---

## 🌟 Core Features

- **📂 File Upload & Automatic Text Extraction**: Supports `.pdf`, `.docx`, and `.txt` files. Reads and parses text directly in the browser client-side using dynamic lightweight scripts (avoiding heavy server-side processing dependencies).
- **⚡ AI-Powered Resume Tailoring**: Automatically optimizes resume bullet points to align with job descriptions using the **Gemini 2.5 Flash** model.
- **📊 Keyword Overlap Checklist**: Displays an instant comparative check showing **Matched Skills** (skills found in the resume) vs. **Missing Skills** (required by the job description but omitted).
- **⚖️ Side-by-Side Comparison Dashboard**: Shows a visual ATS compatibility percentage gauge alongside side-by-side copyable views comparing the original resume text directly against the optimized AI-generated rewrite.
- **🎯 Interview Prep & Technical Tips**: Generates 3-5 tailored interview questions and study tips based on your customized resume and the job role requirements.
- **📄 Instant PDF Download**: Allows downloading the tailored, optimized resume as a clean PDF file using `jsPDF`.
- **📜 History & Analytics Logs**: Tracks previous optimization compliance runs in a collapsible history list to review past metrics.
- **🎨 Neo-Brutalist Aesthetics**: A high-contrast, premium, responsive UI featuring thick borders, hard offset shadows, custom typography, and vibrant green accents.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js v14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom Neo-brutalist theme
- **AI Core**: [Google Gemini 2.5 Flash API](https://ai.google.dev/) (`@google/generative-ai`)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Text Extractors**: [PDF.js](https://mozilla.github.io/pdf.js/) and [Mammoth.js](https://github.com/mikespook/mammoth) (loaded dynamically in the client)
- **PDF Exporter**: [jsPDF](https://github.com/parallax/jsPDF)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🔑 Environment Configuration

Create a `.env` file in the root of the project with the following environment variables:

```env
MONGO_DB_URI="your_mongodb_connection_uri"
GEMINI_API_KEY="your_google_gemini_api_key"
JWT_SECRET="your_custom_jwt_session_secret"
```

---

## 🚀 Getting Started

To run the application locally on your machine, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Open the App
Navigate to [http://localhost:3000](http://localhost:3000) in your web browser to start optimizing your resumes.
