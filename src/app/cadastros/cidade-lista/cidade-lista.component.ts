import { Component, OnInit } from '@angular/core';
import { Cidade } from '../model/cidade';
import { Router } from '@angular/router';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-lista',
  templateUrl: './cidade-lista.component.html',
  styleUrls: ['./cidade-lista.component.css']
})
export class CidadeListaComponent  implements OnInit {

  cidadeLista: Cidade[] = [];
  cidadeSelecionada: Cidade;
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private router: Router, private service: CidadeService){
    
  }

  ngOnInit(): void {
    this.service.getAll().subscribe( resposta => this.cidadeLista = resposta);      
  }

  novoCadastro(){
    this.router.navigate(['/cidade/form']);
  }

  deletar(){
    this.service.deletar(this.cidadeSelecionada).subscribe( resposta =>{
      this.mensagemSucesso = "Cidade deletada com sucesso!";
      this.ngOnInit();
    },
      erro => this.mensagemErro = "Ocorreu um erro ao deletar esta cidade"
    )
  }

  adicionaSelecionado( cidade: Cidade){
    this.cidadeSelecionada = cidade;
  }


}
