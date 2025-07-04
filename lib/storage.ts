import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostSummaryType } from '../types/post';

const VISITED_POSTS_KEY = 'visited_posts';

export interface VisitedPost extends PostSummaryType {
  visitedAt: number; // timestamp
}

export const storage = {
  // Save a visited post
  async saveVisitedPost(post: PostSummaryType): Promise<void> {
    try {
      const visitedPosts = await this.getVisitedPosts();
      
      // Remove if post already exists to avoid duplicates
      const filteredPosts = visitedPosts.filter(p => p.id !== post.id);
      
      // Add new post at the beginning with current timestamp
      const newVisitedPost: VisitedPost = {
        ...post,
        visitedAt: Date.now()
      };
      
      const updatedPosts = [newVisitedPost, ...filteredPosts];
      
      // Keep only the last 10 posts
      const limitedPosts = updatedPosts.slice(0, 10);
      
      await AsyncStorage.setItem(VISITED_POSTS_KEY, JSON.stringify(limitedPosts));
    } catch (error) {
      console.error('Error saving visited post:', error);
    }
  },

  // Get visited posts (last 10)
  async getVisitedPosts(): Promise<VisitedPost[]> {
    try {
      const data = await AsyncStorage.getItem(VISITED_POSTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting visited posts:', error);
      return [];
    }
  },

  // Clear all visited posts
  async clearVisitedPosts(): Promise<void> {
    try {
      await AsyncStorage.removeItem(VISITED_POSTS_KEY);
    } catch (error) {
      console.error('Error clearing visited posts:', error);
    }
  }
}; 