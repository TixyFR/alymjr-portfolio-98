-- Add before/after image columns for entrainement category
ALTER TABLE public.miniatures 
ADD COLUMN before_image_url TEXT,
ADD COLUMN after_image_url TEXT;

-- Add comment to explain the new columns
COMMENT ON COLUMN public.miniatures.before_image_url IS 'Before image URL for before/after comparisons in entrainement category';
COMMENT ON COLUMN public.miniatures.after_image_url IS 'After image URL for before/after comparisons in entrainement category';