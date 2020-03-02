const threadElement = document.querySelector('#thread');
const inputElement = document.querySelector('input');
const buttonElement = document.querySelector('button');

buttonElement.addEventListener('click', async () => {
    const newComment = inputElement.value

    await fetch('/post/' + newComment).catch(console.error)

    inputElement.value = ""

    window.location.reload()
})

const loadComments = async () => {
    const comments = await fetch('/list')
        .then(data => data.json())
        .catch(console.error)

    console.log(comments)

    for (const comment of comments) {
        const p = document.createElement("p")
        p.innerText = comment.value
        threadElement.append(p)
    }
} 

loadComments()