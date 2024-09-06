/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.elquin.user.userBacker.rest;


import com.elquin.user.userBacker.model.Persona;
import com.elquin.user.userBacker.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.cert.Extension;
import java.util.List;

@RestController
@RequestMapping ("/personas/")
public class PersonaRest {

    @Autowired
    private PersonaService personaService;


    @GetMapping
    private ResponseEntity<List<Persona>> getAllPersonas (){

        return ResponseEntity.ok( personaService.findAll() );
    }

    @PostMapping
    private ResponseEntity<Persona> savePersona(@RequestBody Persona persona){

        try {
            Persona personaGuardada = personaService.save(persona);
            return ResponseEntity.created( new URI("/personas/"+ personaGuardada.getId())).body(personaGuardada);
        } catch (URISyntaxException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @DeleteMapping (value = "/delete/{id}")
    private ResponseEntity<Boolean> deletePersona(@PathVariable ("id") long idPersona){
        personaService.deleteById(idPersona);
        return ResponseEntity.ok(personaService.findById( idPersona)!= null);
     }
}
