import { z } from "zod";

/**
 * Zod schema describing the expected structure of a Reiseplan.  
 * This mirrors the JSON schema we defined previously and provides
 * compile‑time type inference for TypeScript consumers.
 */
export const ReiseplanSchema = z.object({
  reiseziele: z.array(z.string()).min(1),
  reisezeitraum: z.string().regex(/^\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}$/),
  personen: z.number().int().min(1),
  budget: z.enum(["niedrig", "mittel", "hoch", "luxus"]),
  unterkunft: z.object({
    vorschlag: z.string(),
    preisProNacht: z.string(),
    affiliateLink: z.string().url(),
  }),
  tagesplan: z.array(
    z.object({
      tag: z.number().int(),
      datum: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/),
      beschreibung: z.string(),
      aktivitaeten: z.array(
        z.object({
          titel: z.string(),
          beschreibung: z.string(),
          affiliateLink: z.string().url().optional(),
        })
      ),
      restaurant: z.string().optional(),
      bemerkung: z.string().optional(),
    })
  ),
  tipps: z.array(z.string()).optional(),
  premiumEmpfehlung: z
    .object({
      beschreibung: z.string(),
      preis: z.string(),
      jetztBuchenLink: z.string().url(),
    })
    .optional(),
});

export type Reiseplan = z.infer<typeof ReiseplanSchema>;
