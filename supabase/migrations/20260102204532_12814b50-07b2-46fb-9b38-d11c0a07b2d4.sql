-- Create decision_logs table for storing quiz responses
CREATE TABLE public.decision_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario TEXT NOT NULL,
  question TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  key_takeaway TEXT,
  tone TEXT DEFAULT 'encouraging',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.decision_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert decision logs (since we don't have auth yet)
CREATE POLICY "Anyone can insert decision logs"
ON public.decision_logs
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read decision logs
CREATE POLICY "Anyone can read decision logs"
ON public.decision_logs
FOR SELECT
USING (true);