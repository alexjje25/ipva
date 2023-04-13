import axios from 'axios';

export default async (req, res) => {
  const { query } = req;

  try {
    // Fazer a chamada para a API com os parâmetros de Renavam e Placa
    const response = await axios.get('https://api.infosimples.com/api/v2/consultas/sefaz/sp/emissao-guias-ipva?token=dBG-XHkeGSvHCG87mzu6mIqsNtBSG51q3YFqSa6N&timeout=600&placa=&renavam=', {
      params: {
        renavam: query.renavam,
        placa: query.placa
      }
    });

    const data = response.data; // Dados retornados pela API
    res.status(200).json(data); // Enviar os dados como resposta
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao buscar os dados do veículo.' });
  }
};
