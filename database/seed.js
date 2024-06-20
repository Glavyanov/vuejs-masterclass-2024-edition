/* eslint-env node*/

import { fakerEN_US as faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";
// index.js
import { config as runConfiguration } from "@dotenvx/dotenvx";
runConfiguration();

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY)
console.log(supabase)