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

    console.log(commitsPorDiaArray)
    mostrarTela(commitsPorDiaArray)
}

function mostrarTela(commits) {
    const dados = document.querySelector("#dados")
    commits.forEach(element => {
        const h1 = document.createElement("h1")
        h1.innerHTML = element.data + " - " + element.quantidade
        dados.appendChild(h1)
    })
}