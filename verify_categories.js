async function verify() {
    try {
        const res = await fetch('http://localhost:5000/api/posts/categories');
        const data = await res.json();
        console.log('Categories found:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Verification failed:', err.message);
    }
}

verify();
