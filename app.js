function pesquisar() {
  const input = document.getElementById("campo-pesquisa");
  const resultados = document.getElementById("resultados-pesquisa");

  const pesquisa = input.value.toLowerCase();
  const pesquisaSemAcento = removerAcento(pesquisa);

  const palavrasChave = pesquisaSemAcento.split(' ');

  function removerAcento(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  resultados.innerHTML = "";

  if (!pesquisa) {
    resultados.innerHTML = "<p>Por favor, digite algo para pesquisar.</p>";
    return;
  }

  let encontrouResultados = false;
  dados.forEach(dado => {
    const tituloSemAcento = removerAcento(dado.titulo.toLowerCase());
    const descricaoSemAcento = removerAcento(dado.descricao.toLowerCase());
    const tagsSemAcento = removerAcento(dado.tags.toLowerCase());

    if (palavrasChave.every(palavra => {
      return tituloSemAcento.includes(palavra) || 
             descricaoSemAcento.includes(palavra) || 
             tagsSemAcento.includes(palavra);
    })) {
      encontrouResultados = true;
      resultados.innerHTML += `
        <div class="item-resultado">
          <img src="${dado.imagem}" alt="${dado.titulo}" class="resultado-imagem">
          <div class="resultado-texto">
            <h2><a href="${dado.link}" target="_blank">${dado.titulo}</a></h2>
            <p class="descricao-meta">${dado.descricao}</p>
            <a href=${dado.link} target="_blank">✨ Saiba mais</a>
          </div>
        </div>
      `;
    }
  });

  if (!encontrouResultados) {
    resultados.innerHTML = "<p>Nenhum resultado encontrado para a sua pesquisa.</p>";
  }
}
