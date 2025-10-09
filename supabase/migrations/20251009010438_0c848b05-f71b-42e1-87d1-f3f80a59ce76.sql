-- Fix security vulnerability: Remove overly permissive policy
-- The "Only authenticated users can view profiles" policy was too broad
-- and allowed ANY authenticated user to see ALL profiles including emails

-- DROP the problematic policy
DROP POLICY IF EXISTS "Only authenticated users can view profiles" ON public.user_profiles;

-- The existing policies are actually sufficient and properly restrictive:
-- 1. "Users can view their own profile" - allows viewing only your own data
-- 2. "Teachers can view student profiles in their classrooms" - allows teachers to see their students

-- With RLS, PostgreSQL uses OR logic for SELECT policies by default
-- This means if ANY policy grants access, the user can see the data
-- The two existing policies provide the right balance:
--   - Students see only their own profile
--   - Teachers see their own profile + their students' profiles
--   - No one can see arbitrary users' email addresses

-- Add explicit comment documenting the security model
COMMENT ON TABLE public.user_profiles IS 'Contains student and teacher profile information including email addresses. Access is restricted: users can only view their own profile, and teachers can additionally view profiles of students in their classrooms.';