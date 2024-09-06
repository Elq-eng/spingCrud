import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service'
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  personaForm!: FormGroup;
  paises!: any;
  estados!:any;
  personas!: any;


  constructor(
    public fb: FormBuilder,
    public estadoServices: EstadosService,
    public paisesService:PaisesService,
    public personaService:PersonaService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.personaForm = this.fb.group({
      id: [''],
      name :  [ '', Validators.required],
      lastName : [ '', Validators.required] ,
      country :  [ '', Validators.required],
      state :  [ '', Validators.required]
    });

    this.paisesService.getAllPaises().subscribe( resp => {
      this.paises = resp;
    },
    error=> {
      console.log(error);
    } 
    );

    this.personaService.getAllPersonas().subscribe( resp => {
      console.log(resp);
      this.personas = resp


    }, error =>{
      console.error(error);
    })


    this.personaForm.get('country')?.valueChanges.subscribe( value =>{
      console.log('Valor de país cambió:', value);
      this.estadoServices.getAllEstadosByPass(value).subscribe(resp => {
        this.estados = resp;
        this.cdr.detectChanges(); 

      },error => {
        console.log(error)
      })
    });
      
  }

  guardar():void {
    this.personaService.savePersona( this.personaForm.value ).subscribe( response => {
      this.personaForm.reset()
      this.personas.filter( (persona:any) => response.id != persona.id )
      this.personas.push(response)

    } ,error => {
      console.error(error);
    })
  }

  eliminar(persona: any ): void{
    this.personaService.deletePersona( persona.id ).subscribe( response => {
      console.log(response)
      if( response === true ){
        this.personas.pop()
      }
    })
  } 

  editar( persona: any):void{

    this.personaForm.setValue({
      id: persona.id,
      name : persona.name,
      lastName : persona.lastName,
      country :  persona.country,
      state : persona.state
    })
  
  }


}
