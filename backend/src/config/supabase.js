// backend/src/config/supabase.js

// Postgres database is hosted on supabase. More info on the structure of the database can be found at /backend/src/sql-setup 

require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecret = process.env.SUPABASE_SECRET;

const supabase = createClient(supabaseUrl, supabaseSecret);

module.exports = supabase;