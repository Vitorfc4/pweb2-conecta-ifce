export type UserRole = 'Aluno' | 'Professor' | 'Servidor';
export type GroupCategory = 'Tecnologia' | 'Acadêmico' | 'Design' | 'Idiomas';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  campus: string;
  course: string;
  bio: string;
  link?: string;
  followingIds: string[];
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  campus: string;
  course: string;
  bio: string;
  link?: string;
  followers: number;
  following: number;
}

export interface StoredComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface StoredPost {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  likeUserIds: string[];
  createdAt: string;
}

export interface SuggestionUser extends PublicUser {
  isFollowing: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: PublicUser;
  content: string;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  authorId: string;
  author: PublicUser;
  content: string;
  imageUrl?: string;
  tags: string[];
  likes: number;
  comments: number;
  likedByMe: boolean;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  members: number;
  lastActivity: string;
}

export interface MockDb {
  users: StoredUser[];
  posts: StoredPost[];
  comments: StoredComment[];
  groups: Group[];
}

export interface AuthSession {
  token: string;
  user: PublicUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  campus: string;
  course: string;
  bio: string;
}

export interface CreatePostPayload {
  content: string;
  image?: File | null;
}

export interface CreateCommentPayload {
  content: string;
}

export interface ProfileResponse {
  user: PublicUser;
  posts: FeedPost[];
  isFollowing: boolean;
  isOwnProfile: boolean;
}

export interface ApiErrorShape {
  message: string;
  errors?: Record<string, string[]>;
}

export interface FeedListResponse {
  items: FeedPost[];
}
