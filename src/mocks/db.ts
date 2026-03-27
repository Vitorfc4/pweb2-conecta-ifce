import type {
  AuthSession,
  Comment,
  CreateCommentPayload,
  CreatePostPayload,
  FeedPost,
  Group,
  LoginPayload,
  MockDb,
  ProfileResponse,
  PublicUser,
  RegisterPayload,
  StoredComment,
  StoredPost,
  StoredUser,
} from '@/types';

const STORAGE_KEY = 'conecta-ifce:mock-db:v2';

const seedUsers: StoredUser[] = [
  {
    id: 'user-ana',
    name: 'Ana Silva',
    email: 'ana.silva@ifce.edu.br',
    password: '12345678',
    role: 'Aluno',
    campus: 'Tauá',
    course: 'Análise e Desenvolvimento de Sistemas',
    bio: 'Estudante focada em front-end, acessibilidade e produtos digitais voltados para educação.',
    link: 'github.com/anasilva',
    followingIds: ['user-carlos'],
  },
  {
    id: 'user-carlos',
    name: 'Prof. Carlos Silva',
    email: 'carlos.silva@ifce.edu.br',
    password: '12345678',
    role: 'Professor',
    campus: 'Tauá',
    course: 'Ciência da Computação',
    bio: 'Professor de computação e orientador do laboratório de IA.',
    link: 'linkedin.com/in/carlossilva',
    followingIds: ['user-ana'],
  },
  {
    id: 'user-fernanda',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@ifce.edu.br',
    password: '12345678',
    role: 'Servidor',
    campus: 'Fortaleza',
    course: 'Gestão Acadêmica',
    bio: 'Servidora focada em integração estudantil e eventos institucionais.',
    link: 'ifce.edu.br/fernanda-lima',
    followingIds: ['user-ana'],
  },
];

const seedGroups: Group[] = [
  {
    id: 'group-ia',
    name: 'Inteligência Artificial e Machine Learning',
    description: 'Discussões semanais sobre IA, artigos recentes e projetos aplicados no IFCE.',
    category: 'Tecnologia',
    members: 48,
    lastActivity: 'Hoje às 14:00',
  },
  {
    id: 'group-web',
    name: 'Desenvolvimento Web Full Stack',
    description: 'Grupo para estudar React, APIs, arquitetura front-end e deploy.',
    category: 'Tecnologia',
    members: 62,
    lastActivity: 'Ontem às 18:20',
  },
  {
    id: 'group-pesquisa',
    name: 'Pesquisa Científica e Metodologia',
    description: 'Apoio a TCC, iniciação científica, revisão bibliográfica e escrita acadêmica.',
    category: 'Acadêmico',
    members: 35,
    lastActivity: 'Segunda-feira',
  },
  {
    id: 'group-idiomas',
    name: 'Clube de Idiomas',
    description: 'Conversação, trocas culturais e materiais para inglês e espanhol.',
    category: 'Idiomas',
    members: 27,
    lastActivity: 'Hoje às 09:10',
  },
];

const seedPosts: StoredPost[] = [
  {
    id: 'post-1',
    authorId: 'user-carlos',
    content:
      'Empolgado para anunciar nossa nova bolsa de pesquisa para o laboratório de IA. Estudantes interessados em aprendizado de máquina podem visitar o Lab 304 na próxima terça-feira. #Pesquisa #IA #IFCE',
    tags: ['Pesquisa', 'IA', 'IFCE'],
    likeUserIds: ['user-ana', 'user-fernanda'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'post-2',
    authorId: 'user-ana',
    content:
      'Muito feliz em compartilhar que nossa equipe ficou em 1º lugar no Hackathon do IFCE. Foi uma jornada incrível de colaboração e prototipação rápida. #Hackathon #FrontEnd #ConectaIFCE',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hackathon', 'FrontEnd', 'ConectaIFCE'],
    likeUserIds: ['user-carlos', 'user-fernanda'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'post-3',
    authorId: 'user-fernanda',
    content:
      'As inscrições para a Mostra de Extensão seguem abertas até sexta-feira. Aproveitem para submeter os projetos da turma. #Extensão #Projetos',
    tags: ['Extensão', 'Projetos'],
    likeUserIds: ['user-ana'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
];

const seedComments: StoredComment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    authorId: 'user-ana',
    content: 'Professor, vou passar no laboratório na terça. Obrigada pelo aviso!',
    createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
  },
  {
    id: 'comment-2',
    postId: 'post-2',
    authorId: 'user-carlos',
    content: 'Parabéns, Ana! Excelente resultado para a equipe.',
    createdAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
  },
];

function sleep(ms = 280) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function generateId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem selecionada.'));
    reader.readAsDataURL(file);
  });
}

function followersCount(userId: string, users: StoredUser[]) {
  return users.filter((item) => item.followingIds.includes(userId)).length;
}

function toPublicUser(user: StoredUser, users: StoredUser[]): PublicUser {
  const { password: _password, followingIds, ...safe } = user;
  return {
    ...safe,
    followers: followersCount(user.id, users),
    following: followingIds.length,
  };
}

function createSession(user: StoredUser, users: StoredUser[]): AuthSession {
  return {
    token: `mock-jwt.${btoa(`${user.id}:${Date.now()}`)}.signature`,
    user: toPublicUser(user, users),
  };
}

export function ensureMockDb() {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const initialDb: MockDb = {
      users: seedUsers,
      groups: seedGroups,
      posts: seedPosts,
      comments: seedComments,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
  }
}

function readDb(): MockDb {
  ensureMockDb();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw
    ? (JSON.parse(raw) as MockDb)
    : { users: [], posts: [], comments: [], groups: [] };
}

function writeDb(db: MockDb) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function getUserOrThrow(db: MockDb, userId: string) {
  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  return user;
}

function buildPost(db: MockDb, post: StoredPost, viewerId?: string): FeedPost {
  const author = getUserOrThrow(db, post.authorId);
  const commentsCount = db.comments.filter((comment) => comment.postId === post.id).length;

  return {
    id: post.id,
    authorId: post.authorId,
    author: toPublicUser(author, db.users),
    content: post.content,
    imageUrl: post.imageUrl,
    tags: post.tags,
    likes: post.likeUserIds.length,
    comments: commentsCount,
    likedByMe: viewerId ? post.likeUserIds.includes(viewerId) : false,
    createdAt: post.createdAt,
  };
}

function buildComment(db: MockDb, comment: StoredComment): Comment {
  const author = getUserOrThrow(db, comment.authorId);
  return {
    id: comment.id,
    postId: comment.postId,
    author: toPublicUser(author, db.users),
    content: comment.content,
    createdAt: comment.createdAt,
  };
}

export async function loginWithCredentials(payload: LoginPayload) {
  await sleep();
  const db = readDb();
  const user = db.users.find(
    (item) => item.email.toLowerCase() === payload.email.toLowerCase() && item.password === payload.password,
  );

  if (!user) {
    throw new Error('E-mail ou senha inválidos.');
  }

  return createSession(user, db.users);
}

export async function registerUser(payload: RegisterPayload) {
  await sleep(420);
  const db = readDb();
  const exists = db.users.some((item) => item.email.toLowerCase() === payload.email.toLowerCase());

  if (exists) {
    throw new Error('Já existe uma conta cadastrada com esse e-mail.');
  }

  const newUser: StoredUser = {
    id: generateId('user'),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    campus: payload.campus,
    course: payload.course,
    bio: payload.bio,
    link: '',
    followingIds: [],
  };

  db.users.unshift(newUser);
  writeDb(db);
  return createSession(newUser, db.users);
}

export async function fetchFeed(viewerId?: string): Promise<FeedPost[]> {
  await sleep(250);
  const db = readDb();
  return db.posts
    .map((post) => buildPost(db, post, viewerId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createPost(authorId: string, payload: CreatePostPayload) {
  await sleep(220);
  const db = readDb();
  const author = getUserOrThrow(db, authorId);
  const value = payload.content.trim();

  if (!value) {
    throw new Error('Escreva algo antes de publicar.');
  }

  const tags = Array.from(
    new Set(
      value
        .split(/\s+/)
        .filter((word) => word.startsWith('#'))
        .map((word) => word.replace('#', '').trim())
        .filter(Boolean),
    ),
  );

  const imageUrl = payload.image ? await readFileAsDataUrl(payload.image) : undefined;

  const newPost: StoredPost = {
    id: generateId('post'),
    authorId,
    content: value,
    imageUrl,
    tags,
    likeUserIds: [],
    createdAt: new Date().toISOString(),
  };

  db.posts.unshift(newPost);
  writeDb(db);

  return {
    item: buildPost(db, newPost, authorId),
    author: toPublicUser(author, db.users),
    message: 'Publicação criada com sucesso.',
  };
}

export async function togglePostLike(postId: string, viewerId: string) {
  await sleep(120);
  const db = readDb();
  const post = db.posts.find((item) => item.id === postId);

  if (!post) {
    throw new Error('Publicação não encontrada.');
  }

  const index = post.likeUserIds.indexOf(viewerId);
  if (index >= 0) {
    post.likeUserIds.splice(index, 1);
  } else {
    post.likeUserIds.unshift(viewerId);
  }

  writeDb(db);

  return {
    liked: index < 0,
    likes: post.likeUserIds.length,
  };
}

export async function fetchComments(postId: string) {
  await sleep(150);
  const db = readDb();
  return db.comments
    .filter((item) => item.postId === postId)
    .map((item) => buildComment(db, item))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function createComment(postId: string, viewerId: string, payload: CreateCommentPayload) {
  await sleep(150);
  const db = readDb();
  const post = db.posts.find((item) => item.id === postId);

  if (!post) {
    throw new Error('Publicação não encontrada.');
  }

  const value = payload.content.trim();
  if (!value) {
    throw new Error('Escreva um comentário antes de enviar.');
  }

  const comment: StoredComment = {
    id: generateId('comment'),
    postId,
    authorId: viewerId,
    content: value,
    createdAt: new Date().toISOString(),
  };

  db.comments.push(comment);
  writeDb(db);

  return buildComment(db, comment);
}

export async function fetchGroups() {
  await sleep(240);
  return readDb().groups;
}

export async function fetchProfile(viewerId: string, profileId: string): Promise<ProfileResponse> {
  await sleep(200);
  const db = readDb();
  const user = getUserOrThrow(db, profileId);
  const posts = db.posts
    .filter((post) => post.authorId === profileId)
    .map((post) => buildPost(db, post, viewerId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    user: toPublicUser(user, db.users),
    posts,
    isFollowing: viewerId === profileId ? false : getUserOrThrow(db, viewerId).followingIds.includes(profileId),
    isOwnProfile: viewerId === profileId,
  };
}

export async function toggleFollow(viewerId: string, targetUserId: string) {
  await sleep(180);
  const db = readDb();
  const viewer = getUserOrThrow(db, viewerId);

  if (viewerId === targetUserId) {
    throw new Error('Você não pode seguir seu próprio perfil.');
  }

  const target = getUserOrThrow(db, targetUserId);
  const exists = viewer.followingIds.includes(targetUserId);

  viewer.followingIds = exists
    ? viewer.followingIds.filter((id) => id !== targetUserId)
    : [targetUserId, ...viewer.followingIds];

  writeDb(db);

  return {
    following: !exists,
    profile: toPublicUser(target, db.users),
    viewer: toPublicUser(viewer, db.users),
  };
}

export async function fetchSuggestions(currentUserId: string) {
  await sleep(140);
  const db = readDb();
  const current = getUserOrThrow(db, currentUserId);
  return db.users
    .filter((user) => user.id !== currentUserId)
    .map((user) => ({
      ...toPublicUser(user, db.users),
      isFollowing: current.followingIds.includes(user.id),
    }))
    .slice(0, 4);
}
