class Posts {
    constructor(usuario_id, titulo, conteudo) {
        this.usuario_id = usuario_id;
        this.titulo = titulo;
        this.conteudo = conteudo;
    }

    async createPost() {
        try {
            const response = await fetch('http://192.168.1.53:3333/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario_id: this.usuario_id,
                    titulo: this.titulo,
                    conteudo: this.conteudo
                })
            });
            if (!response.ok) {
                throw new Error('Erro ao criar o post');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro na criação do post:', error);
            throw error;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts');

    const userEmail = localStorage.getItem('userEmail');

    const getUserIdFromEmail = async (email) => {
        const response = await fetch(`http://192.168.1.53:3333/user/email?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter o ID do usuário');
        }
        const data = await response.json();
        return data.id;
    };

    const loadPosts = async () => {
        try {
            const response = await fetch('http://192.168.1.53:3333/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();
            postsContainer.innerHTML = '';

            posts.forEach((post) => {
                const postElement = createPostElement(post.titulo, post.conteudo, post.likes, post.id);
                postsContainer.prepend(postElement);
            });

            addHeartAnimation();
        } catch (error) {
            console.error('Erro ao carregar os posts:', error);
        }
    };

    const savePost = async (title, content) => {
        const userID = await getUserIdFromEmail(userEmail);
        const post = new Posts(userID, title, content);
        await post.createPost();
        loadPosts();
    };

    const createPostElement = (title, content, likes, postId) => {
        const postElement = document.createElement('div');
        postElement.classList.add('Post');
        postElement.setAttribute('data-id', postId);
        postElement.innerHTML = `
            <div class="Post__text">
                <h3 class="post-title">${title}</h3>
                <p class="text__content">${content}</p>
            </div>
            <div class="post__interact">
                <div class="input--send">
                    <input type="text" class="input__interact comment-input" placeholder="Escreva seu comentário">
                    <img src="img/Send.svg" alt="Enviar" class="send__icon">
                </div>
                <div class="post__icons">
                    <label class="interact__like">
                        <div class="like__content">
                            <img src="img/Heart - outlined.svg" alt="Coração Contornado" class="heart">
                            <p class="like__count">${likes}</p>
                        </div>
                    </label>
                    <label class="comment__interact">
                        <div class="comment__content">
                            <img src="img/Comments.svg" alt="comentários" class="comment__img">
                            <p class="comment__count">0</p>
                        </div>
                    </label>
                </div>
            </div>
            <div class="comments-section hidden">
                <div class="comments-list">
                <div class="Post__text">
                <h3 class="post-title">$Ola Mundo</h3>
                <p class="text__content">$Ola Mundo</p>
            </div>
                </div>
            </div>
        `;

        const commentIcon = postElement.querySelector('.comment__content img');
        commentIcon.addEventListener('click', toggleCommentSection);

        const sendIcon = postElement.querySelector('.send__icon');
        sendIcon.addEventListener('click', (event) => addComment(event, postElement));

        return postElement;
    };

    const toggleCommentSection = (event) => {
        const postElement = event.target.closest('.Post');
        const commentSection = postElement.querySelector('.comments-section');
        if (commentSection) {
            commentSection.classList.toggle('hidden');
        }
    };

    const addComment = async (event, postElement) => {
        event.preventDefault();
        const commentInput = postElement.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        if (commentText === "") {
            return;
        }

        const postId = postElement.getAttribute('data-id');

        try {
            const userID = await getUserIdFromEmail(userEmail);

            const response = await fetch('http://192.168.1.53:3333/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: postId,
                    usuario_id: userID,
                    comentario: commentText
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar o comentário');
            }


            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
                <p><span class="comment-author">Você</span>: <span class="comment-text">${commentText}</span></p>
            `;
            const commentsList = postElement.querySelector('.comments-list');
            commentsList.appendChild(newComment);
            commentInput.value = '';
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    function addLike(postElement) {
        const postId = postElement.getAttribute('data-id');
        const likeCountElement = postElement.querySelector('.like__count');
        const heartIcon = postElement.querySelector('.heart');

        fetch('http://192.168.1.53:3333/like', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: postId })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao curtir o post');
                }
                let currentLikes = parseInt(likeCountElement.textContent);
                likeCountElement.textContent = currentLikes + 1;
                heartIcon.src = 'img/Heart - full.svg';
            })
            .catch(error => {
                console.error('Erro ao curtir o post:', error);
            });
    }

    function RemoveLike(postElement) {
        const postId = postElement.getAttribute('data-id');
        const likeCountElement = postElement.querySelector('.like__count');
        const heartIcon = postElement.querySelector('.heart');

        fetch('http://192.168.1.53:3333/RemoveLike', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: postId })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao descurtir o post');
                }
                let currentLikes = parseInt(likeCountElement.textContent);
                if (currentLikes > 0) {
                    likeCountElement.textContent = currentLikes - 1;
                    heartIcon.src = 'img/Heart - outlined.svg';
                }
            })
            .catch(error => {
                console.error('Erro ao descurtir o post:', error);
            });
    }

    function addHeartAnimation() {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.addEventListener('click', function () {
                const postElement = heart.closest('.Post');
                const isFilled = heart.getAttribute('data-filled') === 'true';

                if (isFilled) {
                    RemoveLike(postElement);
                    heart.setAttribute('data-filled', 'false');
                    heart.src = 'img/Heart - outlined.svg';
                } else {
                    addLike(postElement);
                    heart.setAttribute('data-filled', 'true');
                }

                heart.classList.add('heart-animation');
                setTimeout(() => heart.classList.remove('heart-animation'), 500);
            });
        });
    }

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
