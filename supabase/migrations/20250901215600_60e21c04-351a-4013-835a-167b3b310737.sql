-- Create table for miniatures
CREATE TABLE public.miniatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.miniatures ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required)
CREATE POLICY "Anyone can view miniatures" 
ON public.miniatures 
FOR SELECT 
USING (true);

-- Admin policies would be added later when auth is implemented
-- For now, we'll handle admin access through the application logic

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_miniatures_updated_at
  BEFORE UPDATE ON public.miniatures
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();