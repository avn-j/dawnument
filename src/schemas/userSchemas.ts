import { z } from "zod";
import { DateTime } from "luxon";
import { COUNTRIES_LIST } from "@/lib/consts";

export const accountSetupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    dateOfBirth: z.coerce
        .date()
        // If user inputs a date older than 1990-01-01
        // eg. 1889-01-01 > 1990-01-01 will return false
        .refine((date) => date > new Date("1990-01-01"), {
            message: "Date of birth must be after 1990-01-01",
        })
        // If user puts a future date
        .refine((date) => date < new Date(), {
            message: "Date of birth must not be in the future.",
        })
        .refine((date) => DateTime.fromJSDate(date) < DateTime.now().minus({ years: 16 }), {
            message: "You must be over 16 to use this website.",
        }),
    country: z
        .string()
        .refine((country) => country != "", "Please select a country")
        .refine((country) => COUNTRIES_LIST.includes(country), "Not a valid country."),
});
