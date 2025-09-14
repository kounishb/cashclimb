-- Create user profiles table for teacher/student functionality
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  display_name TEXT,
  email TEXT,
  grade_level INTEGER CHECK (grade_level >= 3 AND grade_level <= 8),
  school_name TEXT,
  teacher_code TEXT, -- for students to join teacher's class
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create classrooms table for teachers to organize students
CREATE TABLE IF NOT EXISTS public.classrooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  grade_level INTEGER NOT NULL CHECK (grade_level >= 3 AND grade_level <= 8),
  classroom_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create classroom_memberships table for student-classroom relationships
CREATE TABLE IF NOT EXISTS public.classroom_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  classroom_id UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(classroom_id, student_id)
);

-- Create lessons table to store actual lesson content
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grade_level INTEGER NOT NULL CHECK (grade_level >= 3 AND grade_level <= 8),
  module_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  article_content TEXT,
  quiz_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(grade_level, module_number)
);

-- Create lesson_progress table to track detailed student progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  video_completed BOOLEAN NOT NULL DEFAULT false,
  video_completed_at TIMESTAMP WITH TIME ZONE,
  article_completed BOOLEAN NOT NULL DEFAULT false,
  article_completed_at TIMESTAMP WITH TIME ZONE,
  quiz_completed BOOLEAN NOT NULL DEFAULT false,
  quiz_score INTEGER CHECK (quiz_score >= 0 AND quiz_score <= 100),
  quiz_attempts INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create badges table for XP-based achievements
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  xp_required INTEGER NOT NULL,
  grade_level INTEGER CHECK (grade_level >= 3 AND grade_level <= 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_badges table to track earned badges
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view all profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for classrooms
CREATE POLICY "Teachers can manage their classrooms" ON public.classrooms FOR ALL USING (auth.uid() = teacher_id);
CREATE POLICY "Students can view classrooms they belong to" ON public.classrooms FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.classroom_memberships cm WHERE cm.classroom_id = id AND cm.student_id = auth.uid())
);

-- Create policies for classroom_memberships
CREATE POLICY "Teachers can manage memberships in their classrooms" ON public.classroom_memberships FOR ALL USING (
  EXISTS (SELECT 1 FROM public.classrooms c WHERE c.id = classroom_id AND c.teacher_id = auth.uid())
);
CREATE POLICY "Students can view their own memberships" ON public.classroom_memberships FOR SELECT USING (auth.uid() = student_id);

-- Create policies for lessons (public read access since they're educational content)
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);

-- Create policies for lesson_progress
CREATE POLICY "Users can manage their own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view progress of students in their classrooms" ON public.lesson_progress FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.classroom_memberships cm
    JOIN public.classrooms c ON cm.classroom_id = c.id
    WHERE cm.student_id = user_id AND c.teacher_id = auth.uid()
  )
);

-- Create policies for badges
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);

-- Create policies for user_badges
CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view badges of students in their classrooms" ON public.user_badges FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.classroom_memberships cm
    JOIN public.classrooms c ON cm.classroom_id = c.id
    WHERE cm.student_id = user_id AND c.teacher_id = auth.uid()
  )
);
CREATE POLICY "System can insert badges for users" ON public.user_badges FOR INSERT WITH CHECK (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classrooms_updated_at BEFORE UPDATE ON public.classrooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON public.lesson_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample badges for different XP levels
INSERT INTO public.badges (name, description, icon, xp_required, grade_level) VALUES
('Money Explorer', 'First steps in financial education', '🎯', 50, 3),
('Coin Collector', 'Earned your first 100 XP', '🪙', 100, 3),
('Budget Buddy', 'Completed 5 modules', '💰', 250, 3),
('Savings Star', 'Earned 500 total XP', '⭐', 500, 4),
('Finance Apprentice', 'Completed 10 modules', '🎓', 700, 4),
('Money Master', 'Earned 1000 total XP', '🏆', 1000, 5),
('Investment Initiate', 'Completed 15 modules', '📈', 1200, 5),
('Budget Boss', 'Earned 1500 total XP', '👑', 1500, 6),
('Financial Scholar', 'Completed 20 modules', '📚', 1800, 6),
('Money Mentor', 'Earned 2500 total XP', '🌟', 2500, 7),
('Finance Expert', 'Completed all grade modules', '🥇', 3000, 8),
('Financial Legend', 'Earned 5000 total XP', '💎', 5000, 8);

-- Function to automatically award badges when XP thresholds are met
CREATE OR REPLACE FUNCTION public.check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
    total_xp INTEGER;
    badge_record RECORD;
    user_grade INTEGER;
BEGIN
    -- Get user's total XP and grade level
    SELECT 
        COALESCE(SUM(lp.xp_earned), 0),
        up.grade_level
    INTO total_xp, user_grade
    FROM public.lesson_progress lp
    JOIN public.user_profiles up ON up.user_id = lp.user_id
    WHERE lp.user_id = NEW.user_id
    GROUP BY up.grade_level;

    -- Award badges for XP thresholds
    FOR badge_record IN 
        SELECT * FROM public.badges 
        WHERE xp_required <= total_xp 
        AND (grade_level IS NULL OR grade_level <= user_grade)
        AND id NOT IN (SELECT badge_id FROM public.user_badges WHERE user_id = NEW.user_id)
    LOOP
        INSERT INTO public.user_badges (user_id, badge_id)
        VALUES (NEW.user_id, badge_record.id);
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to award badges when progress is updated
CREATE TRIGGER award_badges_on_progress_update
    AFTER INSERT OR UPDATE ON public.lesson_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.check_and_award_badges();

-- Generate classroom codes function
CREATE OR REPLACE FUNCTION public.generate_classroom_code()
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists BOOLEAN;
BEGIN
    LOOP
        code := upper(substring(md5(random()::text) from 1 for 6));
        SELECT EXISTS(SELECT 1 FROM public.classrooms WHERE classroom_code = code) INTO exists;
        EXIT WHEN NOT exists;
    END LOOP;
    RETURN code;
END;
$$ LANGUAGE plpgsql;