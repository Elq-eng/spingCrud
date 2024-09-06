package com.elquin.user.userBacker.repository;

import com.elquin.user.userBacker.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Long>{
    
}
