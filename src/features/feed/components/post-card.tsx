import { useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeedPost } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatRelativeDate, getInitials } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/auth.store';
import { feedService } from '@/features/feed/feed.service';

interface PostCardProps {
  post: FeedPost;
}

export function PostCard({ post }: PostCardProps) {
  const viewer = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { mutate } = useSWRConfig();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [sendingComment, setSendingComment] = useState(false);
  const [liking, setLiking] = useState(false);

  const serviceContext = useMemo(
    () =>
      viewer
        ? {
            viewerId: viewer.id,
            token,
          }
        : null,
    [token, viewer],
  );

  const commentsKey = serviceContext && showComments ? ['comments', post.id, serviceContext.viewerId] : null;

  const { data: comments, isLoading: commentsLoading, error: commentsError } = useSWR(
    commentsKey,
    ([, postId]) => feedService.listComments(serviceContext!, postId),
  );

  async function handleLike() {
    if (!serviceContext || liking) {
      return;
    }

    setLiking(true);

    const optimisticPost: FeedPost = {
      ...post,
      likedByMe: !post.likedByMe,
      likes: post.likes + (post.likedByMe ? -1 : 1),
    };

    try {
      await mutate(
        ['feed', serviceContext.viewerId],
        async (current?: FeedPost[]) => {
          const previous = current ?? [];
          await feedService.toggleLike(serviceContext, post.id);
          return previous.map((item) => (item.id === post.id ? optimisticPost : item));
        },
        {
          optimisticData: (current?: FeedPost[]) =>
            (current ?? []).map((item) => (item.id === post.id ? optimisticPost : item)),
          rollbackOnError: true,
          revalidate: false,
          populateCache: true,
        },
      );
    } finally {
      setLiking(false);
    }
  }

  async function handleCommentSubmit() {
    if (!serviceContext || !commentText.trim()) {
      return;
    }

    setSendingComment(true);
    setCommentError('');

    try {
      await feedService.addComment(serviceContext, post.id, { content: commentText });
      setCommentText('');
      await mutate(['comments', post.id, serviceContext.viewerId]);
      await mutate(['feed', serviceContext.viewerId]);
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Não foi possível comentar.');
    } finally {
      setSendingComment(false);
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <Avatar initials={getInitials(post.author.name)} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/app/profile/${post.author.id}`} className="font-bold transition hover:text-brand-700">
                {post.author.name}
              </Link>
              <Badge>{post.author.role}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {post.author.course} • {formatRelativeDate(post.createdAt)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-700">{post.content}</p>

        {post.tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        {post.imageUrl ? (
          <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-white">
            <img src={post.imageUrl} alt="Imagem anexada ao post" className="max-h-[420px] w-full object-cover" />
          </div>
        ) : null}
      </div>

      <div className="border-t border-border px-5 py-4">
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <button
            type="button"
            className={`inline-flex items-center gap-2 transition hover:text-foreground ${post.likedByMe ? 'text-brand-700' : ''}`}
            onClick={handleLike}
            disabled={liking}
          >
            <Heart className={`h-4 w-4 ${post.likedByMe ? 'fill-current' : ''}`} /> {post.likes}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 transition hover:text-foreground"
            onClick={() => setShowComments((current) => !current)}
          >
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </button>
          <button type="button" className="inline-flex items-center gap-2 transition hover:text-foreground">
            <Share2 className="h-4 w-4" /> Compartilhar
          </button>
        </div>
      </div>

      {showComments ? (
        <div className="border-t border-border bg-slate-50/60 px-5 py-4">
          <div className="flex gap-3">
            <Input
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Escreva um comentário"
              aria-label="Novo comentário"
            />
            <Button onClick={handleCommentSubmit} disabled={sendingComment || !commentText.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {commentError ? (
            <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" aria-live="polite">
              {commentError}
            </p>
          ) : null}

          <div className="mt-4 space-y-4">
            {commentsLoading ? <p className="text-sm text-muted-foreground">Carregando comentários...</p> : null}
            {commentsError ? <p className="text-sm text-red-600">Não foi possível carregar os comentários.</p> : null}
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 rounded-3xl border border-border bg-white p-4">
                <Avatar initials={getInitials(comment.author.name)} className="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/app/profile/${comment.author.id}`} className="text-sm font-bold hover:text-brand-700">
                      {comment.author.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{formatRelativeDate(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm leading-7 text-slate-700">{comment.content}</p>
                </div>
              </div>
            ))}
            {!commentsLoading && !commentsError && comments?.length === 0 ? (
              <p className="text-sm text-muted-foreground">Seja o primeiro a comentar esta publicação.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
