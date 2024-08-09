import { Produto } from "src/app/cadastros/model/produto";
import { Venda } from "./venda";

export class VendaItens{
    id: number;
    valorUnitario: number;
    valorTotal: number;
    quantidade: number;
    produto: Produto = new Produto();
    venda: Venda = new Venda();
}

