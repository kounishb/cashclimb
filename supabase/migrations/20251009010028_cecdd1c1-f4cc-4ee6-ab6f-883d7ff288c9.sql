-- Fix the buggy RLS policy for students viewing classrooms
-- The existing policy incorrectly checks cm.classroom_id = cm.id 
-- instead of cm.classroom_id = classrooms.id

DROP POLICY IF EXISTS "Students can view classrooms they belong to" ON public.classrooms;

CREATE POLICY "Students can view classrooms they belong to" 
ON public.classrooms
FOR SELECT 
USING (
  EXISTS (
    SELECT 1
    FROM public.classroom_memberships cm
    WHERE cm.classroom_id = classrooms.id 
    AND cm.student_id = auth.uid()
  )
);