let posts = [];

// Function to submit a new post
function submitPost() {
    const postContent = document.getElementById("postContent").value;
    const imageUpload = document.getElementById("imageUpload").files[0];

    if (postContent.trim() !== "" || imageUpload) {
        const post = {
            content: postContent,
            image: imageUpload ? URL.createObjectURL(imageUpload) : null,
            likes: 0,
            comments: [],
        };

        posts.push(post);
        document.getElementById("postContent").value = "";
        document.getElementById("imageUpload").value = ""; // Reset file input
        displayPosts();
    }
}

// Function to display all posts
function displayPosts() {
    const postList = document.getElementById("postList");
    postList.innerHTML = ''; // Clear previous posts

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        
        let postHTML = `
            <p>${post.content}</p>
        `;
        
        if (post.image) {
            postHTML += `<img src="${post.image}" alt="Post Image">`;
        }

        postHTML += `
            <div class="post-actions">
                <button onclick="likePost(${index})">Like (${post.likes})</button>
                <button onclick="showCommentBox(${index})">Comment</button>
            </div>
            <div class="comments" id="comments-${index}">
                ${post.comments.map(comment => `<p>- ${comment}</p>`).join('')}
            </div>
            <div class="comment-box" id="commentBox-${index}" style="display: none;">
                <textarea id="commentText-${index}" placeholder="Write a comment..."></textarea>
                <button onclick="submitComment(${index})">Submit Comment</button>
            </div>
        `;
        
        postElement.innerHTML = postHTML;
        postList.appendChild(postElement);
    });
}

// Function to like a post
function likePost(index) {
    posts[index].likes++;
    displayPosts();
}

// Function to show comment box
function showCommentBox(index) {
    const commentBox = document.getElementById(`commentBox-${index}`);
    commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
}

// Function to submit a comment
function submitComment(index) {
    const commentText = document.getElementById(`commentText-${index}`).value;
    if (commentText.trim() !== "") {
        posts[index].comments.push(commentText);
        document.getElementById(`commentText-${index}`).value = ''; // Clear textarea
        displayPosts();
    }
}
