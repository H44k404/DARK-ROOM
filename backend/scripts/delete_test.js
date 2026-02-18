(async ()=>{
  const fetch = global.fetch;
  const loginRes = await fetch('http://localhost:5000/api/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email: 'superadmin@darkroom.lk', password: 'admin123' }) });
  const login = await loginRes.json();
  console.log('token present?', !!login.token);
  const postsRes = await fetch('http://localhost:5000/api/posts');
  const posts = await postsRes.json();
  console.log('posts count before', posts.length);
  if (posts.length === 0) return;
  const id = posts[0].id;
  console.log('deleting id', id);
  const del = await fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + login.token } });
  console.log('delete status', del.status);
  const after = await (await fetch('http://localhost:5000/api/posts')).json();
  console.log('posts count after', after.length);
})();
