const API_URL = 'http://localhost:3001/opinionsSystem/v1';
let currentUser = JSON.parse(localStorage.getItem('user')) || null;

// --- CONTROL DE VISTAS ---
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
}

window.onload = () => {
    if (currentUser) {
        showView('feedView');
        document.getElementById('userInfo').classList.remove('hidden');
        document.getElementById('welcomeName').innerText = `@${currentUser.UserUsername}`;
        fetchPublications();
    } else {
        showView('loginView');
    }
};

// --- AUTH ---
async function handleLogin() {
    const userLoggin = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;

    if(!userLoggin || !password) return alert("Ingresa tus credenciales");

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userLoggin, password })
    });
    const result = await res.json();

    if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.data));
        location.reload();
    } else {
        alert("X" + result.message); // Mostrará "Usuario no encontrado" o "Contraseña incorrecta"
        document.getElementById('loginPass').value = ''; // Limpia el password por seguridad
    }
}

async function handleRegister() {
    // Obtenemos los valores de los inputs
    const UserName = document.getElementById('regName').value.trim();
    const UserSurname = document.getElementById('regSurname').value.trim();
    const UserUsername = document.getElementById('regUsername').value.trim();
    const UserEmail = document.getElementById('regEmail').value.trim();
    const UserPassword = document.getElementById('regPass').value;

    // 1. Validación básica en el FRONTEND (antes de enviar al servidor)
    if (!UserName || !UserSurname || !UserUsername || !UserEmail || !UserPassword) {
        return alert(" Todos los campos son obligatorios.");
    }

    if (UserPassword.length < 6) {
        return alert(" La contraseña debe tener al menos 6 caracteres.");
    }

    const data = { UserName, UserSurname, UserUsername, UserEmail, UserPassword };

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await res.json();

        if (res.ok) {
            alert(' ¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
            showView('loginView');
        } else {
            // 2. Manejo de errores que vienen del BACKEND
            if (result.error && result.error.includes("duplicate key")) {
                alert(" El nombre de usuario o el correo ya están registrados.");
            } else if (result.message) {
                alert(" " + result.message);
            } else {
                alert(" Error al registrarse. Revisa los datos.");
            }
        }
    } catch (err) {
        alert(' Error de conexión con el servidor.');
    }
}

function logout() {
    localStorage.clear();
    location.reload();
}

// --- PUBLICACIONES ---
async function fetchPublications() {
    const res = await fetch(`${API_URL}/publications`);
    const result = await res.json();
    renderFeed(result.data);
}

async function fetchMyPublications() {
    const res = await fetch(`${API_URL}/publications/author/${currentUser._id}`);
    const result = await res.json();
    renderFeed(result.data || []);
}

async function createPublication() {
    const data = {
        PublicationTitle: document.getElementById('pubTitle').value,
        PublicationCategory: document.getElementById('pubCategory').value,
        PublicationContent: document.getElementById('pubContent').value,
        PublicationAuthor: currentUser._id
    };
    await fetch(`${API_URL}/publications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    location.reload();
}

async function deletePost(id) {
    if(!confirm('¿Eliminar opinión?')) return;
    await fetch(`${API_URL}/publications/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: currentUser._id })
    });
    location.reload();
}

function renderFeed(publications) {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    publications.forEach(pub => {
        const isOwner = currentUser && pub.PublicationAuthor?._id === currentUser._id;
        feed.innerHTML += `
            <div class="card bg-white p-5 rounded-xl border border-gray-200">
                <div class="flex justify-between mb-2 text-xs font-bold text-indigo-500 uppercase tracking-wider">
                    <span>${pub.PublicationCategory}</span>
                    ${isOwner ? `<button onclick="deletePost('${pub._id}')" class="text-red-400">Eliminar</button>` : ''}
                </div>
                <h3 class="text-lg font-bold">${pub.PublicationTitle}</h3>
                <p class="text-gray-600 my-3">${pub.PublicationContent}</p>
                <div class="flex justify-between items-center text-sm border-t pt-3 border-gray-50">
                    <span class="text-gray-400">Por @${pub.PublicationAuthor?.UserUsername}</span>
                    <button onclick="showCommentBox('${pub._id}')" class="font-bold text-indigo-600">Comentar</button>
                </div>
                <div id="comment-area-${pub._id}" class="hidden mt-3">
                    <input id="input-${pub._id}" type="text" placeholder="Escribe un comentario..." class="w-full p-2 border rounded text-sm mb-2">
                    <button onclick="postComment('${pub._id}')" class="text-xs bg-indigo-600 text-white px-3 py-1 rounded">Enviar</button>
                    <div id="comments-list-${pub._id}" class="mt-2 space-y-1"></div>
                </div>
            </div>
        `;
    });
}

// --- COMENTARIOS ---
function showCommentBox(pubId) {
    const box = document.getElementById(`comment-area-${pubId}`);
    box.classList.toggle('hidden');
    if(!box.classList.contains('hidden')) fetchComments(pubId);
}

async function fetchComments(pubId) {
    const res = await fetch(`${API_URL}/comments/${pubId}`);
    const result = await res.json();
    const list = document.getElementById(`comments-list-${pubId}`);
    list.innerHTML = result.data.map(c => `
        <div class="bg-gray-50 p-2 rounded text-xs">
            <b class="text-indigo-600">@${c.CommentAuthor?.UserUsername}:</b> ${c.CommentContent}
        </div>
    `).join('');
}

async function postComment(pubId) {
    const content = document.getElementById(`input-${pubId}`).value;
    await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            CommentContent: content,
            CommentPublication: pubId,
            CommentAuthor: currentUser._id
        })
    });
    document.getElementById(`input-${pubId}`).value = '';
    fetchComments(pubId);
}