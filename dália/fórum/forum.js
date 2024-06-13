document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts');

    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    };

    const savePost = (title, content) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    };

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = postTitle.value.trim();
        const content = postContent.value.trim();
        if (title && content) {
            savePost(title, content);
            postTitle.value = '';
            postContent.value = '';
        }
    });

    loadPosts();
});