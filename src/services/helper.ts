export const funcionamentoInicial = (): Record<string, any> => {
    return {
        "domingo": {
            "abertura": "fechado",
            "fechamento": "fechado"
        },
        "segunda": {
            "abertura": "fechado",
            "fechamento": "fechado"
        },
        "terca": {
            "abertura": "fechado",
            "fechamento": "fechado"
        },
        "quarta": {
            "abertura": "fechado",
            "fechamento": "fechado"
        },
        "quinta": {
            "abertura": "fechado",
            "fechamento": "fechado"
        },
        "sexta": {
            "abertura": "fechado",
            "fechamento": "fechado"
        },
        "sabado": {
            "abertura": "fechado",
            "fechamento": "fechado"
        }
    };

}



export const formataNumero = (numero: string) => {
    // Remove os 3 primeiros caracteres (+55)
    const numeroSemCodigoPais = numero.substring(3);
  
    // Adiciona um '9' na terceira posição
    const numeroComNove = `${numeroSemCodigoPais.slice(0, 2)}9${numeroSemCodigoPais.slice(2)}`;

    return numeroComNove;
}
  