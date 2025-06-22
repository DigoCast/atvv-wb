import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import lixo from "../../assets/images/lixo.png"

interface IProduto {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
}

const Produto: React.FC = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([])

  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        alert("Não foi possivel carregar os produtos")
      })
  }, [])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3001/produtos/${id}`, {
        method: "DELETE",
      });
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
      alert("Produto excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert("Erro ao excluir produto.");
    }
  };

  const [filtro, setFiltro] = useState<string>("");

  const produtosFiltrados = useMemo(() => {
    if (!filtro) return produtos;
    return produtos.filter(
      (produto) =>
        produto.id.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [produtos, filtro]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  return (
    <div className="container-tipos">
      <div className="container-cli-pro-ser">
        <h2>Produtos</h2>
        <div className="search-session">
          <div className="search-bar">
            <SearchBar
              placeholder="Digite o ID ou o nome do produto"
              onChange={handleSearchChange}
            />
          </div>
          <Link to={"/cadastroproduto"} style={{ color: "inherit" }}>
            <div className="button-cadastro">
              <span>Cadastrar Produto</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="table-component" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th className="descricao-tabela">Descrição</th>
              <th>Valor</th>
              <th className="ultimacoluna"></th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td className="descricao-tabela">{produto.descricao}</td>
                <td>R$ {produto.valor}</td>
                <td className="ultimacoluna">
                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="botao-excluir"
                  >
                    <img src={lixo} alt="excluir" className="excluir-img" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produto;
