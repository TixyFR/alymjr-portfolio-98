-- Add order column to miniatures table for drag and drop ordering
ALTER TABLE public.miniatures 
ADD COLUMN display_order INTEGER NOT NULL DEFAULT 0;

-- Create index for better performance when ordering
CREATE INDEX idx_miniatures_display_order ON public.miniatures(display_order);

-- Update existing rows with incremental order based on created_at
WITH ordered_miniatures AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY category ORDER BY created_at) as new_order
  FROM public.miniatures
)
UPDATE public.miniatures m
SET display_order = om.new_order
FROM ordered_miniatures om
WHERE m.id = om.id;