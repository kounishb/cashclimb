-- Add grade_level column to game_progress table to properly track which grade's modules are completed
ALTER TABLE public.game_progress ADD COLUMN grade_level INTEGER NOT NULL DEFAULT 3;

-- Drop the old unique constraint
ALTER TABLE public.game_progress DROP CONSTRAINT IF EXISTS game_progress_user_id_module_id_key;

-- Add new unique constraint that includes grade_level
ALTER TABLE public.game_progress ADD CONSTRAINT game_progress_user_id_module_id_grade_key 
UNIQUE (user_id, module_id, grade_level);

-- Update existing record to have the correct grade level (assuming the existing module 1 completion was for grade 3)
UPDATE public.game_progress 
SET grade_level = 3 
WHERE module_id = 1;