-- Fix RLS policies to allow full CRUD operations on miniatures table

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can view miniatures" ON public.miniatures;

-- Enable RLS (should already be enabled but let's make sure)
ALTER TABLE public.miniatures ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for all operations
CREATE POLICY "Allow all operations on miniatures" 
ON public.miniatures 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Also add a category column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'miniatures' 
                   AND column_name = 'category') THEN
        ALTER TABLE public.miniatures ADD COLUMN category text DEFAULT 'miniatures';
    END IF;
END $$;