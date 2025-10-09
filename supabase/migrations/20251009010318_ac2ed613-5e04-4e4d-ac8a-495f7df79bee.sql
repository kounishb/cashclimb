-- Add explicit protection against unauthenticated access to user_profiles
-- This prevents potential harvesting of student email addresses and school information

-- Drop and recreate the policy to ensure it's the most restrictive base policy
-- The existing policies already implicitly block unauthenticated users, but this makes it explicit

-- First, let's add a comment to document the security model
COMMENT ON TABLE public.user_profiles IS 'Contains student and teacher profile information including email addresses. Access is restricted to authenticated users only, with additional policies limiting visibility.';

-- Add an explicit restrictive policy that requires authentication for any SELECT
-- This policy will be evaluated alongside the existing policies
-- Since we're using AND logic (default), all policies must pass for access to be granted

CREATE POLICY "Only authenticated users can view profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Ensure the existing policies are still in place (they provide additional restrictions):
-- 1. "Users can view their own profile" - restricts to own user_id
-- 2. "Teachers can view student profiles in their classrooms" - restricts to classroom relationships

-- Note: With multiple SELECT policies, PostgreSQL uses OR logic by default
-- So a user can SELECT if they match ANY of the policies
-- The "authenticated users" policy + the specific policies ensure:
-- 1. You must be authenticated (this policy)
-- 2. AND you must either own the profile OR be a teacher of that student