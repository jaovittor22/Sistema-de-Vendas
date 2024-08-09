import { Component, OnInit } from '@angular/core';
import { Venda } from '../model/venda';
import { VendaService } from 'src/app/services/venda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/cadastros/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { VendaItens } from '../model/venda-itens';
import { Produto } from 'src/app/cadastros/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {  
  venda: Venda = new Venda();
  success: boolean = false;
  errors: String[] = [];
  id: number = 0;
  clienteLista: Cliente[] = [];
  vendaItemLista: VendaItens[] = [];
  vendaItemSelecionado: VendaItens = new VendaItens();
  produtoLista: Produto[] = [];
  produto: Produto = new Produto();

  constructor( 
    private service: VendaService,  
    private serviceCliente: ClienteService,  
    private serviceProduto: ProdutoService, 
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.venda = new Venda();
  }

  ngOnInit(): void {

    let params : Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];
          
          if(this.id){
            this.service.getById(this.id).subscribe((response) =>{
              const retorno = JSON.stringify(response);
              const obj = JSON.parse(retorno);
              this.venda = obj.data;
            });
          }    
          
          
      })
      this.serviceCliente.getAll().subscribe( response => this.clienteLista = response );
      this.serviceProduto.getAll().subscribe( response => this.produtoLista = response );
  }

  voltarParaListagem(){
    this.router.navigate(['/venda/lista']);
  }

  onSubmit(){
    this.venda.itens = this.vendaItemLista;

    if(this.id){
      this.service.alterar(this.venda)
          .subscribe(response => {
            this.success = true;
            this.errors = [];
          }, errorResponse => {
            this.errors = ['Erro ao alterar o Venda']
          }
      )
    }else{
      this.service.inserir(this.venda).subscribe( response => {
        this.success = true;
        this.errors = [];
        this.venda = response;
      }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      }
      )
    }
    //this.voltarParaListagem();
  }

  enviaItemExcluir(item: VendaItens){
    this.vendaItemSelecionado = item;

  }

  lancaProduto(){

    this.vendaItemSelecionado.produto = this.produto;
    this.vendaItemLista.push({...this.vendaItemSelecionado});

  }


}
