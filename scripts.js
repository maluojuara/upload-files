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

listaTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("excluir-tag")) {
        const tagParaExcluir = event.target.parentElement; 
        listaTags.removeChild(tagParaExcluir); 
    }
});

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript", "React", "Angular"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 200) 
    })
}

inputCategoria.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const textoCategoria =  inputCategoria.value.trim();
        if (textoCategoria !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(textoCategoria);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${textoCategoria}</p> <img src="./img/close-black.svg" alt="Excluir tag" class="excluir-tag">`
                    listaTags.appendChild(tagNova);
                    inputCategoria.value = "";
                } else {
                    alert("Tag não encontrada!")
                }
            } catch (error) {
                console.error("Erro ao verificar existência da tag")
                alert("Erro ao verificar existência da tag. Verifique o console!")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomedoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso!");
            } else {
                reject("Erro ao publicar um projeto!")
            }
        }, 500)
    })
}

botaoPublicar.addEventListener("click", async (event) => {
    event.preventDefault();
    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resolve)
        alert("Formulário submetido com sucess!")
    } catch (error) {
        console.log("Deu errado: ", error)
        alert("Deu tudo errado!")
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (event) => {
    event.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "imagem_projeto.png";

    listaTags.innerHTML = "";
})