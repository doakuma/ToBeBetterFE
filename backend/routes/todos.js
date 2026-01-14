import express from 'express';
import { todoDB } from '../data/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticateToken);

/**
 * GET /api/todos
 * TODO 목록 조회 (본인 것만)
 */
router.get('/', (req, res, next) => {
  try {
    const userId = req.user.id;
    const todos = todoDB.findAll(userId);
    res.json({ todos });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/todos/:id
 * TODO 상세 조회
 */
router.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    const todo = todoDB.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // 본인 것만 조회 가능
    if (todo.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ todo });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/todos
 * TODO 생성
 */
router.post('/', (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = todoDB.create({
      userId,
      title,
      description: description || '',
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/todos/:id
 * TODO 수정
 */
router.put('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    const { title, description, completed } = req.body;

    const todo = todoDB.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // 본인 것만 수정 가능
    if (todo.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = todoDB.update(id, updateData);

    res.json({
      message: 'Todo updated successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/todos/:id
 * TODO 삭제
 */
router.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const todo = todoDB.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // 본인 것만 삭제 가능
    if (todo.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    todoDB.delete(id);

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
