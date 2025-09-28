-- Fix user_profiles RLS policy to protect student personal information
-- Drop the overly permissive policy that allows all users to see all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.user_profiles;

-- Create new restrictive policies for viewing user profiles
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow teachers to view profiles of students in their classrooms
CREATE POLICY "Teachers can view student profiles in their classrooms" 
ON public.user_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.classroom_memberships cm
    JOIN public.classrooms c ON c.id = cm.classroom_id
    WHERE cm.student_id = user_profiles.user_id 
    AND c.teacher_id = auth.uid()
  )
);