/**
 * 메모리 DB (실습용)
 * 실제 프로젝트에서는 데이터베이스로 교체
 */

// 초기 데이터
let users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // password: admin123
    name: 'Admin User',
    createdAt: new Date().toISOString(),
  },
];

let todos = [
  {
    id: 1,
    userId: 1,
    title: 'Express 서버 만들기',
    description: '실습용 Express 서버 구성하기',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    title: 'React Query 연동하기',
    description: '프론트엔드에서 API 호출하기',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextUserId = 2;
let nextTodoId = 3;

// Users CRUD
export const userDB = {
  findAll: () => users,
  findById: (id) => users.find((user) => user.id === id),
  findByEmail: (email) => users.find((user) => user.email === email),
  create: (userData) => {
    const newUser = {
      id: nextUserId++,
      ...userData,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },
  update: (id, userData) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...userData, updatedAt: new Date().toISOString() };
    return users[index];
  },
  delete: (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    return users.splice(index, 1)[0];
  },
};

// Todos CRUD
export const todoDB = {
  findAll: (userId) => {
    if (userId) {
      return todos.filter((todo) => todo.userId === userId);
    }
    return todos;
  },
  findById: (id) => todos.find((todo) => todo.id === id),
  create: (todoData) => {
    const newTodo = {
      id: nextTodoId++,
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    return newTodo;
  },
  update: (id, todoData) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    todos[index] = {
      ...todos[index],
      ...todoData,
      updatedAt: new Date().toISOString(),
    };
    return todos[index];
  },
  delete: (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    return todos.splice(index, 1)[0];
  },
};
