// lib/data/mockStore.ts

import { UserRole } from '@prisma/client'; // Mock import for UserRole type

// --- MOCK DATA STRUCTURES ---

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole.USER; // Only USER role exists now
  totalPagesRead: number;
}

export interface MockLeaderboardEntry {
  userId: string;
  name: string;
  totalPagesRead: number;
}

// In-memory "Database" - INITIAL SEED DATA
let mockUsers: MockUser[] = [
  {
    id: "u1",
    name: "Beginner Bob",
    email: "bob@example.com",
    role: UserRole.USER,
    totalPagesRead: 150,
  },
  {
    id: "u2",
    name: "Reader Rachel",
    email: "rachel@example.com",
    role: UserRole.USER,
    totalPagesRead: 400,
  },
];

let mockBooks = [
    { id: "b1", title: "Simplified Pride and Prejudice", author: "Jane Austen", pageCount: 432 },
    { id: "b2", title: "Simple Sherlock Holmes", author: "Arthur Conan Doyle", pageCount: 300 },
];

// --- MOCK CRUD OPERATIONS ---

/**
 * Get all users, sorted for leaderboard.
 */
export function getLeaderboardData(): MockLeaderboardEntry[] {
    return mockUsers
        .map(user => ({
            userId: user.id,
            name: user.name,
            totalPagesRead: user.totalPagesRead,
        }))
        .sort((a, b) => b.totalPagesRead - a.totalPagesRead);
}

/**
 * Update a user's total pages read.
 */
export function updatePagesRead(userId: string, pages: number): MockUser | null {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;

    mockUsers[userIndex].totalPagesRead += pages;
    return mockUsers[userIndex];
}

/**
 * Get a list of books (simple access).
 */
export function getAllBooks() {
    return mockBooks;
}

/**
 * Find user by ID (needed for session logic)
 */
export function findUserById(userId: string): MockUser | undefined {
    return mockUsers.find(u => u.id === userId);
}

/**
 * Create a new user (used after successful registration)
 */
export function createMockUser(newUser: Omit<MockUser, 'totalPagesRead' | 'role'>): MockUser {
    const finalUser: MockUser = {
        ...newUser,
        id: newUser.id,
        role: UserRole.USER, // Enforce USER role
        totalPagesRead: 0,
    };
    mockUsers.push(finalUser);
    return finalUser;
}
