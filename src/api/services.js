/**
 * TERROIR API Services Layer
 * Simulates async API calls with realistic delays.
 * Replace these functions with real fetch() calls to your Headless CMS.
 */

import { articles } from './mockData/articles';
import { restaurants } from './mockData/restaurants';
import { wineClubPlans, founderBenefits } from './mockData/wineClub';

const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// ── Articles ──────────────────────────────────────────
export async function getArticles(filter = 'todos') {
  await delay(500);
  if (filter === 'todos') return articles;
  return articles.filter(a => a.category === filter);
}

export async function getArticleBySlug(slug) {
  await delay(400);
  const article = articles.find(a => a.slug === slug);
  if (!article) throw new Error('Article not found');
  const related = articles.filter(a => article.relatedIds?.includes(a.id));
  return { ...article, related };
}

export async function getFeaturedArticles() {
  await delay(300);
  return articles.filter(a => a.featured).slice(0, 3);
}

// ── Restaurants ───────────────────────────────────────
export async function getRestaurants(filters = {}) {
  await delay(500);
  let result = [...restaurants];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q)
    );
  }
  if (filters.zone && filters.zone !== 'todas') {
    result = result.filter(r => r.zone === filters.zone);
  }
  if (filters.priceLevel) {
    result = result.filter(r => r.priceLevel <= filters.priceLevel);
  }
  if (filters.minRating) {
    result = result.filter(r => r.rating >= filters.minRating);
  }
  if (filters.cuisine && filters.cuisine !== 'todas') {
    result = result.filter(r => r.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()));
  }
  return result;
}

export async function getRestaurantBySlug(slug) {
  await delay(400);
  const restaurant = restaurants.find(r => r.slug === slug);
  if (!restaurant) throw new Error('Restaurant not found');
  return restaurant;
}

export async function getFeaturedRestaurants() {
  await delay(300);
  return restaurants.filter(r => r.featured).slice(0, 3);
}

export async function getRestaurantZones() {
  await delay(100);
  const zones = [...new Set(restaurants.map(r => r.zone))];
  return zones.sort();
}

// ── Wine Club ─────────────────────────────────────────
export async function getWineClubPlans() {
  await delay(400);
  return wineClubPlans;
}

export async function getFounderBenefits() {
  await delay(200);
  return founderBenefits;
}

export async function subscribeNewsletter(email) {
  await delay(1200);
  console.log('Newsletter subscription:', email);
  return { success: true, message: '¡Suscripción exitosa!' };
}

export async function subscribeFounder(data) {
  await delay(1500);
  console.log('Founder subscription:', data);
  return { success: true, message: '¡Bienvenido, Miembro Fundador!' };
}
