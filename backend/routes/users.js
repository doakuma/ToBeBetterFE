import express from 'express';
import { userDB } from '../data/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/users
 * 사용자 목록 조회 (인증 필요)
 */
router.get('/', authenticateToken, (req, res, next) => {
  try {
    const users = userDB.findAll();
    // 비밀번호 제외하고 응답
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json({ users: usersWithoutPassword });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/users/:id
 * 사용자 상세 조회 (인증 필요)
 */
router.get('/:id', authenticateToken, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = userDB.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 비밀번호 제외하고 응답
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/users/:id
 * 사용자 정보 수정 (인증 필요, 본인만 수정 가능)
 */
router.put('/:id', authenticateToken, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id; // JWT에서 추출한 사용자 ID

    // 본인만 수정 가능
    if (id !== userId) {
      return res.status(403).json({ error: 'You can only update your own profile' });
    }

    const { name, email } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) {
      // 이메일 중복 확인 (본인 제외)
      const existingUser = userDB.findByEmail(email);
      if (existingUser && existingUser.id !== id) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      updateData.email = email;
    }

    const updatedUser = userDB.update(id, updateData);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 비밀번호 제외하고 응답
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'User updated successfully', user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/users/:id
 * 사용자 삭제 (인증 필요, 본인만 삭제 가능)
 */
router.delete('/:id', authenticateToken, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    // 본인만 삭제 가능
    if (id !== userId) {
      return res.status(403).json({ error: 'You can only delete your own account' });
    }

    const deletedUser = userDB.delete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
