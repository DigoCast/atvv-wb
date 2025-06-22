import React, { useEffect, useState } from "react";
import "./style.css";

interface Cliente {
  id: number;
  nome: string;
}

interface Produto {
  id: string;
  nome: string;
}

interface Servico {
  id: string;
  nome: string;
}

const RegistrarConsumo: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [clienteId, setClienteId] = useState<number>(0);
  const [produtoId, setProdutoId] = useState<string>("");
  const [servicoId, setServicoId] = useState<string>("");
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [quantidadeServico, setQuantidadeServico] = useState<number>(1);

  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then((res) => res.json())
      .then(setClientes);
    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then(setProdutos);
    fetch("http://localhost:3001/servicos")
      .then((res) => res.json())
      .then(setServicos);
  }, []);

  const registrarProduto = async () => {
    if (!clienteId) {
      alert("Adicione um Cliente Primeiro");
      return;
    }
    await fetch(`http://localhost:3001/cliente/${clienteId}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoId, quantidade: quantidadeProduto }),
    });
    alert("Produto Registrado!");
  };

  const registrarServico = async () => {
    if (!clienteId) {
      alert("Adicione um Cliente Primeiro");
      return;
    }
    await fetch(`http://localhost:3001/cliente/${clienteId}/servicos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ servicoId, quantidade: quantidadeServico }),
    });
    alert("Servico Registrado!");
  };

  return (
    <div className="container-consumo">
      <h2>Registrar Consumo</h2>
      <div className="formconsumo">
        <h3>Cliente</h3>
        <select
          onChange={(e) => setClienteId(Number(e.target.value))}
          required
          className="select-cliente"
        >
          <option value="">Selecione</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id} className="select-cliente">
              {c.nome}
            </option>
          ))}
        </select>

        <div className="container-prodserv-consumo">
          <h3>Produto</h3>
          <div className="selecao-prodserv-consumo">
            <select
              onChange={(e) => setProdutoId(e.target.value)}
              required
              className="select-produto-servico"
            >
              <option value="">Selecione um produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            <div className="num-button-consumo">
              <input
                type="number"
                min="1"
                value={quantidadeProduto}
                onChange={(e) => setQuantidadeProduto(Number(e.target.value))}
                className="quantidade-consumo"
              />
              <button onClick={registrarProduto} className="botao-consumir">
                Registrar Produto
              </button>
            </div>
          </div>
        </div>

        <div className="container-prodserv-consumo">
          <h3>Serviço</h3>
          <div className="selecao-prodserv-consumo">
            <select
              onChange={(e) => setServicoId(e.target.value)}
              required
              className="select-produto-servico"
            >
              <option value="">Selecione um serviço</option>
              {servicos.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
            <div className="num-button-consumo">
              <input
                type="number"
                min="1"
                value={quantidadeServico}
                onChange={(e) => setQuantidadeServico(Number(e.target.value))}
                className="quantidade-consumo"
              />
              <button onClick={registrarServico} className="botao-consumir">
                Registrar Serviço
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarConsumo;
