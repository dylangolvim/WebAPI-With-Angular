import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompaniesService } from 'src/app/companies.service';
import { Company } from 'src/app/Company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  companies!: Company[];
  nameCompany!: string;
  companyId!: number; 

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef!: BsModalRef;

  constructor(private companiesService: CompaniesService, 
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.companiesService.GetCompanies().subscribe(resultado =>{
      this.companies = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      companyName: new FormControl(null),
      companyENI: new FormControl(null),
      companyAdress: new FormControl(null),
      companyEmail: new FormControl(null)
    })
  }

  ExibirFormularioAtualizacao(companyId: number):void{
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.companiesService.GetCompanyById(companyId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar ${resultado.companyName}`;

      this.formulario = new FormGroup({
        companyId: new FormControl(resultado.companyId),
        companyName: new FormControl(resultado.companyName),
        companyENI: new FormControl(resultado.companyENI),
        companyAdress: new FormControl(resultado.companyAdress),
        companyEmail: new FormControl(resultado.companyEmail)
      })
    })
  }

  EnviarFormulario(): void {
    const company: Company = this.formulario.value;

    if(company.companyId > 0){
      this.companiesService.PutCompany(company).subscribe(resultado =>{
      this.visibilidadeFormulario=false;
      this.visibilidadeTabela=true;
      alert("Pessoa Atualizada com sucesso");
      this.companiesService.GetCompanies().subscribe(registros =>{
        this.companies = registros;
      });

      })
    }else{
      this.companiesService.PostCompany(company).subscribe(resultado => {
        this.visibilidadeFormulario=false;
        this.visibilidadeTabela=true;
        alert("Pessoa inserida com sucesso");
        this.companiesService.GetCompanies().subscribe(registros =>{
          this.companies = registros;
        });
      });
    }
  }

  Voltar(): void{
    this.visibilidadeTabela=true;
    this.visibilidadeFormulario=false;
  }

  ExibirConfirmacaoExclusao(companyId: number, nameCompany: string, conteudoModal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.companyId = companyId;
    this.nameCompany = nameCompany;
  }

  ExcluirCompany(companyId: number){
    this.companiesService.DeleteCompany(companyId).subscribe(resultado =>{
      this.modalRef.hide();
      alert("Pessoa Excluída com sucesso");
      this.companiesService.GetCompanies().subscribe(registro =>{
        this.companies = registro;
      });
    });
  }
}
