
package rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.PaisService;

import model.Pais;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/pais")

public class PaisRest {
    
    @Autowired
    private PaisService paisService;
    
    @GetMapping
    private ResponseEntity<List<Pais>> getAllPaises(){ 
        return ResponseEntity.ok(paisService.findAll());
    }
    
}
