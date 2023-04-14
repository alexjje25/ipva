import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Formulario = () => {
  const [renavam, setRenavam] = useState("");
  const [placa, setPlaca] = useState("");
  const [dadosVeiculo, setDadosVeiculo] = useState(null);
  const [erro, setErro] = useState(null);
  const router = useRouter();

  const [mostrarDados, setMostrarDados] = useState(true);

  const redirectToOutraPagina = () => {
    router.reload(); // Substitua "/outra-pagina" pelo caminho da página que você deseja redirecionar
  };
  const buscarDadosVeiculo = async (e) => {
    e.preventDefault();
    
    try {
      const resposta = await fetch(`https://connect-global.shop/teste-apidivida/consulta_ipva.php?renavam=${renavam}&placa=${placa}`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setDadosVeiculo(dados);
        setErro(null);
        // router.push("/teste")
        setMostrarDados(false);
      } else {
        setDadosVeiculo(null);
        setErro("Erro ao buscar dados do veículo");
        console.log(dadosVeiculo.data)
      }
    } catch (error) {
      setDadosVeiculo(null);
      setErro("Erro ao buscar dados do veículo");
      console.log(dadosVeiculo.data)
    }
  };
// const vencimento = dadosVeiculo?.data[0]?.debitos_ipva[0].data_vencimento;

// useEffect(() => {
//   if (vencimento === ""){
//     console.log('vazio')
//   } 
//  }, []);

  // console.log(dadosVeiculo?.data[0]?.ano_fabricacao)
  // console.log(dadosVeiculo?.data[0]?.debitos_ipva[0].data_vencimento)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center' }}>

      {mostrarDados ? (
        <form onSubmit={buscarDadosVeiculo} style={{ flexDirection: 'column', display: 'flex' }}>
          <label>
            Renavam:
            <input type="text" style={{ width: '86%', height: "26px" }} value={renavam} onChange={(e) => setRenavam(e.target.value)} />
          </label>
          <label>
            Placa:
            <input type="text" style={{ width: '86%', height: "26px" }} value={placa} onChange={(e) => setPlaca(e.target.value)} />
          </label>
          <button type="submit" style={{ marginTop: '25px', width: '56%', background: "aqua", cursor: 'pointer', height: '30px', border: 'none' }}>Buscar</button>
        </form>
      ) :
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', alignItems: 'center', flexDirection: 'column', lineHeight: '58px' }}>
          <p>Ano de Fabricação: {dadosVeiculo?.data[0]?.ano_fabricacao || '-'}</p>
          <p>Marca e Modelo do Veiculo: {dadosVeiculo?.data[0]?.marca_modelo || '-'}</p>

          <p>
            Data de Vencimento:{" "}
            {dadosVeiculo?.data?.[0]?.debitos_ipva?.[0]?.data_vencimento || "-"}
          </p>
          <p>
            Valor Total:{" "}
            {dadosVeiculo?.data?.[0]?.debitos_ipva?.[0]?.valor_total || "-"}
          </p>

          <button onClick={redirectToOutraPagina} style={{ marginTop: '34px', width: '56%', background: "aqua", cursor: 'pointer', height: '30px', border: 'none' }}>Voltar</button>
        </div>
      }



    </div>
  );
};

export default Formulario;
