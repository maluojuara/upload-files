const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputCategoria = document.getElementById("categoria");
const listaTags = document.querySelector(".lista-tags");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

inputUpload.addEventListener('change', async (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }
        catch (erro) {
            console.error ("erro na leitura do arquivo");
        }
    }
})

inputCategoria.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const textoCategoria =  inputCategoria.value.trim();
        if (textoCategoria !== "") {
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${textoCategoria}</p> <img src="./img/close-black.svg" alt="Excluir tag" class="excluir-tag">`
            listaTags.appendChild(tagNova);
            inputCategoria.value = "";
        }
    }
})

listaTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("excluir-tag")) {
        const tagParaExcluir = event.target.parentElement; 
        listaTags.removeChild(tagParaExcluir); 
    }
});