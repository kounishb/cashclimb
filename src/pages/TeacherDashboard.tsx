import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Clock,
  Star,
  Search,
  Plus,
  Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClassroomName, setNewClassroomName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('classrooms')
      .select('*')
      .eq('teacher_id', user.id);

    if (error) {
      console.error('Error loading classrooms:', error);
    } else {
      setClassrooms(data || []);
      if (data && data.length > 0) {
        setSelectedClassroom(data[0]);
        loadStudents(data[0].id);
      }
    }
    setLoading(false);
  };

  const loadStudents = async (classroomId: string) => {
    const { data, error } = await supabase
      .from('classroom_memberships')
      .select(`
        *,
        student:user_profiles!classroom_memberships_student_id_fkey(*)
      `)
      .eq('classroom_id', classroomId);

    if (error) {
      console.error('Error loading students:', error);
    } else {
      setStudents(data?.map(item => item.student) || []);
    }
  };

  const createClassroom = async () => {
    if (!newClassroomName.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.rpc('generate_classroom_code');
    
    if (error) {
      toast.error('Error generating classroom code');
      return;
    }

    const classroomCode = data;

    const { error: insertError } = await supabase
      .from('classrooms')
      .insert({
        teacher_id: user.id,
        name: newClassroomName,
        classroom_code: classroomCode,
        grade_level: 4 // Default grade level
      });

    if (insertError) {
      toast.error('Error creating classroom');
    } else {
      toast.success('Classroom created successfully!');
      setNewClassroomName("");
      setShowCreateForm(false);
      loadClassrooms();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Teacher Dashboard
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor student progress and manage your classrooms
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{students.length}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{classrooms.length}</div>
              <div className="text-sm text-muted-foreground">Classrooms</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">Avg. Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">1,250</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Classrooms */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    My Classrooms
                  </CardTitle>
                  <Button 
                    size="sm" 
                    onClick={() => setShowCreateForm(!showCreateForm)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showCreateForm && (
                  <div className="space-y-3 p-3 bg-primary/5 rounded-lg">
                    <Input
                      placeholder="Classroom name..."
                      value={newClassroomName}
                      onChange={(e) => setNewClassroomName(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={createClassroom} className="flex-1">
                        Create
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                
                {classrooms.map((classroom) => (
                  <div
                    key={classroom.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedClassroom?.id === classroom.id
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setSelectedClassroom(classroom);
                      loadStudents(classroom.id);
                    }}
                  >
                    <div className="font-semibold">{classroom.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Code: {classroom.classroom_code}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Grade {classroom.grade_level}
                    </div>
                  </div>
                ))}

                {classrooms.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No classrooms yet</p>
                    <p className="text-sm">Create your first classroom to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Student Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Student Progress
                  {selectedClassroom && (
                    <Badge variant="outline">
                      {selectedClassroom.name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedClassroom ? (
                  <div className="space-y-4">
                    {/* Search */}
                    <div className="flex gap-4 items-center">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search students..." className="pl-9" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Student List */}
                    <div className="space-y-3">
                      {students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                              {student.display_name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <div className="font-semibold">
                                {student.display_name || 'Student'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {student.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-semibold">XP</div>
                              <div className="text-sm text-muted-foreground">0</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">Modules</div>
                              <div className="text-sm text-muted-foreground">0/12</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-semibold">0</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {students.length === 0 && (
                        <div className="text-center text-muted-foreground py-12">
                          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-semibold mb-2">No students yet</p>
                          <p className="mb-4">Share your classroom code with students so they can join:</p>
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 inline-block">
                            <div className="text-2xl font-bold text-primary">
                              {selectedClassroom.classroom_code}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Select a classroom to view student progress</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                  <Link to="/education">
                    <BookOpen className="h-6 w-6" />
                    View Curriculum
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Manage Students
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Trophy className="h-6 w-6" />
                  View Reports
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Settings className="h-6 w-6" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;