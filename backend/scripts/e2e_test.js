// Use global fetch available in Node 18+
const API = 'http://localhost:5000/api';

async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'superadmin@darkroom.lk', password: 'admin123' })
  });
  const text = await res.text();
  console.log('Login status:', res.status);
  console.log('Login response:', text);
  if (res.ok) return JSON.parse(text).token;
  return null;
}

async function createPost(token) {
  const post = {
    title: 'E2E Test Post from Script',
    slug: 'e2e-test-post-script-' + Date.now(),
    content: '<p>Automated test content</p>',
    excerpt: 'Test excerpt',
    categoryId: 1,
    postType: 'article'
  };
  const res = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(post)
  });
  const text = await res.text();
  console.log('Create post status:', res.status);
  console.log('Create post response:', text);
}

(async () => {
  try {
    const token = await login();
    if (!token) {
      console.error('Login failed, aborting');
      process.exit(1);
    }
    console.log('Token length:', token.length);
    await createPost(token);
  } catch (err) {
    console.error('Error during e2e test:', err);
  }
})();
