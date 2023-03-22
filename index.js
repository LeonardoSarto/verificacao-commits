const form = document.querySelector("form")
form.addEventListener('submit', function(event){
    event.preventDefault()
    const repositorio = document.querySelector("#repositorio").value
    const dataInicial = document.querySelector("#dataInicial").value
    const dataFinal = document.querySelector("#dataFinal").value
    if(repositorio == "" || dataInicial == "" || dataFinal == "") {
        alert("Pesquise por um repositório no campo repositório")
    }
    buscarCommits(repositorio, dataInicial, dataFinal)
    exibirAutorNomeRepositorio(repositorio)
})

function buscarCommits(repositorio, dataInicial, dataFinal) {
    const url = `https://api.github.com/repos/${repositorio}/commits?since=${dataInicial}&until=${dataFinal}`
    fetch(url).then(response => response.json()).then(commits => {
        contarCommits(commits)
    })
}

function contarCommits(commits) {
    const commitsPorDia = {}
    commits.forEach(element => {
        const dataCommit = element.commit.author.date.substr(0, 10)
        if(commitsPorDia[dataCommit]) {
            commitsPorDia[dataCommit].quantidade++
        } else {
            commitsPorDia[dataCommit] = { quantidade: 1, data: dataCommit }
        }
    })
    console.log(commitsPorDia)

    const commitsPorDiaArray = Object.keys(commitsPorDia).map(dataCommit => {
        return {data:dataCommit, quantidade:commitsPorDia[dataCommit].quantidade}
    })

    displayCommits(commitsPorDiaArray)
}

function exibirAutorNomeRepositorio(repositorio) {
    const autor = document.querySelector("#autor")
    const nomeRepositorio = document.querySelector("#nome_repositorio")
    let aux = repositorio.substring(repositorio.indexOf("m") + 2)
    autor.value = aux.substring(0, aux.indexOf("/"))
    nomeRepositorio.value = aux.substring(aux.indexOf("/") + 1)
    document.querySelector("#autor_repositorio").style.display = "grid"
}

function displayCommits(commits) {
    let table = '<table>';
    table += `<tr><th>Data</th><th>Quantidade</th></tr>`;
    commits.forEach((commit) => {
        table = table + `<tr>`;
        table = table + `<td>${commit.data}</td>`;
        table = table + `<td>${commit.quantidade}</td>`;
        table += `</tr>`;
    });
    table += "</table>";
    document.getElementById("commits-table").innerHTML = table;
}