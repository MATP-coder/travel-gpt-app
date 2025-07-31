import { Configuration, OpenAIApi } from "openai";
import { ReiseplanSchema, Reiseplan } from "../../utils/schema";
import { basePrompt } from "../../utils/prompts";

/**
 * Generate a travel itinerary using the OpenAI API.  
 * It accepts the raw user input and delegates the JSON assembly to GPT.
 * The result is validated against the ReiseplanSchema to guard against
 * malformed output.  
 *
 * @param input  Form values describing the desired trip
 * @returns      A parsed and validated Reiseplan object
 */
export async function generatePlan(input: {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  persons: number;
  interests?: string;
  style?: string;
  extras?: string;
}): Promise<Reiseplan> {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Build the user prompt from the supplied form values
  const userPromptLines: string[] = [];
  userPromptLines.push(`Ziel(e): ${input.destination}`);
  userPromptLines.push(`Reisezeitraum: ${input.startDate} bis ${input.endDate}`);
  userPromptLines.push(`Budget: ${input.budget}`);
  userPromptLines.push(`Personen: ${input.persons}`);
  if (input.interests) userPromptLines.push(`Interessen: ${input.interests}`);
  if (input.style) userPromptLines.push(`Reisestil: ${input.style}`);
  if (input.extras) userPromptLines.push(`Besondere Wünsche: ${input.extras}`);
  const userPrompt = userPromptLines.join("\n");

  const messages = [
    { role: "system" as const, content: basePrompt },
    { role: "user" as const, content: userPrompt },
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-4-turbo",
    temperature: 0.7,
    messages,
  });

  const reply = completion.data.choices[0]?.message?.content;
  if (!reply) {
    throw new Error("GPT antwortete nicht");
  }

  let plan: unknown;
  try {
    plan = JSON.parse(reply);
  } catch (err) {
    throw new Error(`Antwort konnte nicht geparst werden: ${err}`);
  }

  const parseResult = ReiseplanSchema.safeParse(plan);
  if (!parseResult.success) {
    throw new Error(
      `Der generierte Reiseplan ist nicht gültig: ${JSON.stringify(
        parseResult.error.issues,
        null,
        2
      )}`
    );
  }
  return parseResult.data;
}
