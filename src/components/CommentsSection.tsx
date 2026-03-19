'use client';

import { useState, useEffect } from 'react';
import { getComments, createComment, initializeStorage } from '@/lib/storage';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  avatar: string;
  replies?: Comment[];
  articleId: string;
  parentId: string | null;
}

interface StoredComment {
  id: string;
  articleId: string;
  author: string;
  email: string;
  content: string;
  parentId: string | null;
  status: string;
  createdAt: string;
}

export default function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyForm, setReplyForm] = useState({ name: '', email: '', content: '' });
  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    initializeStorage();
    loadComments();
  }, [articleSlug]);

  const loadComments = () => {
    const storedComments = getComments(articleSlug);
    const commentMap = new Map<string, Comment>();
    
    storedComments.forEach((c: StoredComment) => {
      commentMap.set(c.id, {
        id: c.id,
        author: c.author,
        email: c.email,
        content: c.content,
        date: new Date(c.createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) + ' at ' + new Date(c.createdAt).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit' 
        }),
        avatar: c.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        replies: [],
        articleId: c.articleId,
        parentId: c.parentId,
      });
    });

    const topLevel: Comment[] = [];
    const replies: Comment[] = [];

    commentMap.forEach(comment => {
      if (comment.parentId === null) {
        topLevel.push(comment);
      } else {
        replies.push(comment);
      }
    });

    replies.forEach(reply => {
      const parent = commentMap.get(reply.parentId!);
      if (parent) {
        parent.replies = [...(parent.replies || []), reply];
      }
    });

    setComments(topLevel);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createComment({
      articleId: articleSlug,
      author: newComment.name,
      email: newComment.email,
      content: newComment.content,
      parentId: null,
      status: 'approved',
    });

    if (saveInfo) {
      localStorage.setItem('commenter_name', newComment.name);
      localStorage.setItem('commenter_email', newComment.email);
    }

    loadComments();
    setNewComment({ name: '', email: '', content: '' });
  };

  const handleReply = (parentId: string) => {
    createComment({
      articleId: articleSlug,
      author: replyForm.name,
      email: replyForm.email,
      content: replyForm.content,
      parentId: parentId,
      status: 'approved',
    });

    loadComments();
    setReplyTo(null);
    setReplyForm({ name: '', email: '', content: '' });
  };

  useEffect(() => {
    const savedName = localStorage.getItem('commenter_name');
    const savedEmail = localStorage.getItem('commenter_email');
    if (savedName && savedEmail) {
      setNewComment(prev => ({ ...prev, name: savedName, email: savedEmail }));
      setSaveInfo(true);
    }
  }, []);

  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Comments ({totalComments})
      </h3>

      {/* Comment Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Leave a Reply</h4>
        <p className="text-sm text-gray-500 mb-4">
          Your email address will not be published. Required fields are marked *
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
            <textarea
              required
              rows={4}
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              placeholder="Share your thoughts..."
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input 
                type="checkbox" 
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded" 
              />
              Save my name and email for future comments
            </label>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                <button
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Reply
                </button>

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <form onSubmit={(e) => { e.preventDefault(); handleReply(comment.id); }} className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={replyForm.name}
                        onChange={(e) => setReplyForm({ ...replyForm, name: e.target.value })}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                        placeholder="Your name"
                      />
                      <input
                        type="email"
                        required
                        value={replyForm.email}
                        onChange={(e) => setReplyForm({ ...replyForm, email: e.target.value })}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                        placeholder="Your email"
                      />
                    </div>
                    <textarea
                      required
                      rows={2}
                      value={replyForm.content}
                      onChange={(e) => setReplyForm({ ...replyForm, content: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none text-sm"
                      placeholder="Write a reply..."
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyTo(null)}
                        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-6 space-y-4 pl-6 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {reply.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h6 className="font-semibold text-gray-900 text-sm">{reply.author}</h6>
                            <span className="text-xs text-gray-400">{reply.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <span className="text-4xl mb-4 block">💬</span>
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  );
}
