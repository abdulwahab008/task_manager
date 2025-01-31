import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import '../index.css';
import { 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  LogOut, 
  Search,
  Filter,
  Calendar,
  Flag,
  ClipboardList,
  CheckCircle,
  Clock
} from 'lucide-react';
import { logout } from '../features/authSlice';

const API_URL = 'http://localhost:3000/api';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, priority
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector(state => state.auth);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTask, priority })
      });
      if (response.ok) {
        setNewTask('');
        fetchTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;

    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: editValue })
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title: task.title, 
          completed: !task.completed 
        })
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const filteredTasks = tasks
    .filter(task => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      if (filter === 'active') return !task.completed && matchesSearch;
      if (filter === 'completed') return task.completed && matchesSearch;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'priority') {
        const priority = { high: 3, medium: 2, low: 1 };
        return priority[b.priority] - priority[a.priority];
      }
      return 0;
    });

  return (
    <div className="MainTask">
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    {/* Enhanced Navbar */}
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 fixed top-0 left-0 right-0 z-10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <span className="text-3xl"></span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white-200 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="px-6 py-2 bg-white/10 rounded-xl text-blue-100 font-medium backdrop-blur-sm border border-white/20 shadow-lg">
              👋 {user?.username}
            </span>
            <Button 
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-2.5 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 border border-red-400/20 shadow-xl"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <main className="pt-28 pb-12 px-4"> {/* Increased top padding */}
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl bg-white/90 backdrop-blur-lg border border-indigo-50">
            <CardContent className="p-8">
              {/* Updated Stats Section */}
              <div className="stats-container mt-8 mb-12 mx-4">
                <div className="grid grid-cols-3 gap-6">
                  <StatsBox
                    IconComponent={ClipboardList}
                    label="Total Tasks"
                    value={tasks.length}
                    color="blue"
                  />
                  <StatsBox
                    IconComponent={CheckCircle}
                    label="Completed"
                    value={tasks.filter(task => task.completed).length}
                    color="green"
                  />
                  <StatsBox
                    IconComponent={Clock}
                    label="Pending"
                    value={tasks.filter(task => !task.completed).length}
                    color="amber"
                  />
                </div>
              </div>

              {/* Search and Filters with reduced width */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="w-full md:w-1/2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-futuristic w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="input-futuristic w-24"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Done</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-futuristic w-24"
                  >
                    <option value="newest">New</option>
                    <option value="oldest">Old</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>

              {/* Add Task Form */}
              <div className="flex justify-center mb-8">
                <form onSubmit={handleSubmit} className="w-3/4 flex flex-col md:flex-row gap-4 p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                  <Input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="What's on your mind?"
                    className="input-futuristic flex-grow"
                  />
                  <div className="flex gap-4 flex-shrink-0">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="input-futuristic w-28"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <Button type="submit" className="btn-primary w-28">
                      Add Task
                    </Button>
                  </div>
                </form>
              </div>

              {/* Task List */}
              <div className="space-y-4">
                {filteredTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`task-item ${task.completed ? 'task-completed' : ''} hover:shadow-lg`}
                  >
                    <button
                      onClick={() => toggleComplete(task)}
                      className={`status-icon ${task.completed ? 'completed' : ''}`}
                      title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {task.completed && <Check className="h-4 w-4" />}
                    </button>

                    {editingTask === task.id ? (
                      <>
                        <Input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="input-futuristic flex-grow text-lg"
                          autoFocus
                        />
                        <div className="button-group">
                          <Button 
                            onClick={() => handleUpdate(task.id)} 
                            className="btn-action complete"
                          >
                            <Check className="h-5 w-5" />
                          </Button>
                          <Button 
                            onClick={() => setEditingTask(null)} 
                            className="btn-action delete"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="flex-grow">{task.title}</span>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setEditingTask(task.id);
                              setEditValue(task.title);
                            }} 
                            className="btn-action edit"
                            title="Edit task"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDelete(task.id)} 
                            className="btn-action delete"
                            title="Delete task"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {filteredTasks.length === 0 && (
                  <div className="empty-state bg-gray-50 text-center py-16 rounded-xl">
                    <p className="text-gray-500 text-lg">
                      No tasks found. Start by adding a new task!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </div>
  );
};

// Stats Box Component
const StatsBox = ({ IconComponent, label, value, color }) => { // Changed icon to IconComponent
  const colorMap = {
    blue: {
      bg: "from-blue-600 via-blue-500 to-indigo-600",
      border: "border-blue-400/30",
      hover: "hover:shadow-blue-500/30",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      glow: "after:bg-blue-500/20",
    },
    green: {
      bg: "from-emerald-600 via-emerald-500 to-green-500",
      border: "border-green-400/30",
      hover: "hover:shadow-green-500/30",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      glow: "after:bg-green-500/20",
    },
    amber: {
      bg: "from-orange-500 via-amber-500 to-yellow-500",
      border: "border-orange-400/30",
      hover: "hover:shadow-orange-500/30",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      glow: "after:bg-amber-500/20",
    },
  };

  const { bg, border, hover, iconBg, iconColor, glow } = colorMap[color];

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6
      bg-gradient-to-br ${bg}
      border-2 ${border}
      transition-all duration-500
      transform hover:scale-105 hover:-translate-y-1
      ${hover}
      shadow-xl
      group
    `}>
      {/* Main Content */}
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-4">
          <div className={`
            ${iconBg} p-3 rounded-xl 
            backdrop-blur-xl border border-white/20
            transition-all duration-300
            group-hover:scale-110
          `}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <span className="text-5xl font-bold text-white tabular-nums">
            {value}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white/90 tracking-wide">
          {label}
        </h3>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-2xl transform rotate-45" />
        <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-2xl transform -rotate-45" />
      </div>

      {/* Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 transition-opacity duration-500
        group-hover:opacity-100 ${glow} blur-2xl
      `} />
    </div>
  );
};

export default TaskManager;
