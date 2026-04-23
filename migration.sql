-- =============================================
--  KEYREER — Database Schema
--  Run this in Supabase Dashboard → SQL Editor
-- =============================================

-- ── 1. USERS ──
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT,
  subjects TEXT,
  major TEXT,
  position TEXT,
  education TEXT,
  skills TEXT,
  experience TEXT,
  tasks TEXT,
  interests TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 2. ASSESSMENTS ──
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  scores JSONB,
  riasec JSONB,
  big_five JSONB,
  schwartz JSONB,
  top_group TEXT,
  second_group TEXT,
  group_details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);

-- ── 3. CAREER SELECTIONS ──
CREATE TABLE IF NOT EXISTS career_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  career_name TEXT NOT NULL,
  fit_level TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_career_sel_user ON career_selections(user_id);
CREATE INDEX IF NOT EXISTS idx_career_sel_assessment ON career_selections(assessment_id);

-- ── 4. ROW LEVEL SECURITY (RLS) ──
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_selections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public update on users" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow public insert on assessments" ON assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on assessments" ON assessments FOR SELECT USING (true);
CREATE POLICY "Allow public insert on career_selections" ON career_selections FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on career_selections" ON career_selections FOR SELECT USING (true);
