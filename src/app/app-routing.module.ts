import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component'; 
import { ProdutosDetalheComponent } from './produtos-detalhe/produtos-detalhe.component';
import { ProdutosEditarComponent } from './produtos-editar/produtos-editar.component';
import { ProdutosNovaComponent } from './produtos-nova/produtos-nova.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'login'}
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {title: 'logout'}
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    data: {title: 'lista de produtos'}
  },
  {
    path: 'produto-detalhe/:id',
    component: ProdutosDetalheComponent,
    data: {title: 'detalhe do produto'}
  },
  {
    path: 'produto-nova',
    component: ProdutosNovaComponent,
    data: {title: 'Adicionar produtos'}
  },
  {
    path: 'produto-editar/:id',
    component: ProdutosEditarComponent,
    data: {title: 'editar produtos'}
  },
  {
    path: '',
    redirectTo: '/produtos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
