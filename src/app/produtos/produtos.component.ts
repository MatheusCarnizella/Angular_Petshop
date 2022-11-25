import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Produto } from 'src/model/produtos';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  displayedColumns: string[] = ['imagem','nome','Descricao','Valor','acao'];
  dataSource: Produto[];
  isLoadingResults = true;
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProdutos()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
