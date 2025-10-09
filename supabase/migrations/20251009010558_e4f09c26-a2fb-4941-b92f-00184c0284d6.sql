-- Fix critical security vulnerability: Prevent users from awarding themselves badges
-- The "System can insert badges for users" policy with condition "true" allows
-- any authenticated user to insert badge records for anyone, undermining gamification

-- DROP the insecure policy
DROP POLICY IF EXISTS "System can insert badges for users" ON public.user_badges;

-- No replacement policy needed! Here's why:
-- The check_and_award_badges() trigger function is defined with SECURITY DEFINER,
-- which means it executes with the privileges of the function owner (postgres),
-- bypassing RLS policies. The trigger can still insert badges automatically.

-- This means:
-- ✅ Badges are still automatically awarded by the trigger system
-- ❌ Users cannot manually award themselves or others badges

-- Add documentation
COMMENT ON TABLE public.user_badges IS 'Tracks badges earned by users. Badges are automatically awarded by the check_and_award_badges() trigger function. Direct insertion is not permitted to prevent users from awarding themselves badges.';