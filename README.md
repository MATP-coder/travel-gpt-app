# Travel GPT App

This repository contains a fully‑functional AI‑powered travel planner.  
Users can submit a travel request, receive a personalised itinerary powered by GPT‑4 and refine that itinerary through a chat interface.  
The application is built with **Next.js** (TypeScript) on the frontend and includes a minimal backend to call the OpenAI API, validate the JSON response and deliver itineraries via email.

## Features

- **Interactive form** – Collects trip details such as destination, dates, budget, number of travellers, interests and style.
- **AI itinerary generation** – Uses OpenAI’s GPT API to generate a detailed day‑by‑day plan in a structured JSON format.
- **JSON validation** – Ensures plans conform to a strict schema using Zod on the server.
- **Email delivery** – Sends the generated itinerary to the user via Gmail (OAuth2 credentials required).
- **Upsell hooks** – Includes placeholder logic for premium upgrades and affiliate links.
- **Modern UI** – Built with Next.js, Tailwind CSS and React.
- **n8n flows** – Sample JSON exports are included under `backend/n8n-flows/` to jump‑start your automation pipeline.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create your environment file**

   Copy `.env.example` to `.env` and fill in the required values:

   - `OPENAI_API_KEY` – Your OpenAI API key for GPT requests.
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY` – Supabase project credentials.
   - `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_USER` – OAuth2 credentials for the Gmail account used to send itineraries.
   - `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY` – (Optional) keys for processing premium upgrades.

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Build for production**

   ```bash
   npm run build
   npm run start
   ```

## Project structure

```
travel-gpt-app/
├── backend/            # Server‑side helpers
│   ├── api/
│   │   ├── gpt-handler.ts    # Wrapper for OpenAI API
│   │   └── sendMail.ts       # Helper for sending Gmail messages
│   └── n8n-flows/
│       └── flow-sample.json   # Example flow export for n8n
├── frontend/
│   ├── components/     # Reusable React components
│   │   ├── ChatBox.tsx
│   │   └── PlanDisplay.tsx
│   ├── pages/          # Next.js pages
│   │   ├── index.tsx         # Landing page with trip form
│   │   ├── result.tsx        # Page to display the generated itinerary
│   │   └── api/
│   │       └── plan.ts       # Next.js API route for itinerary generation
│   ├── styles/
│   │   └── globals.css       # Global Tailwind stylesheet
├── utils/
│   ├── prompts.ts      # Prompt template for GPT
│   └── schema.ts       # Zod schema for validating itineraries
├── .env.example        # Sample environment variables file
├── next.config.js      # Next.js configuration
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Project metadata and scripts
└── tsconfig.json       # TypeScript configuration
```

## Deployment

The project is ready for deployment on Vercel.  
Vercel will automatically detect this as a Next.js application.  
Ensure the environment variables defined in `.env.example` are added to your Vercel project under **Settings → Environment Variables**.  

1. Push this repository to GitHub or another supported Git provider.
2. Go to **vercel.com/import** and import your repository.
3. Provide the required environment variables in Vercel’s dashboard.
4. Click **Deploy**.
5. 

That's it! You now have a fully automated AI‑powered travel planner ready to serve your customers.
