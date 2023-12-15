package com.cms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.backend.exception.ResourceNotFoundException;
import com.cms.backend.model.Manager;
import com.cms.backend.repository.ManagerRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/")
public class ManagerController {

    @Autowired
    private ManagerRepository ManagerRepository;

    @GetMapping("/managers")
    public List<Manager> getManagers() {
        return ManagerRepository.findAll();
    }

    @PostMapping("/managers")
    public Manager createManager(@RequestBody Manager manager) {
        return ManagerRepository.save(manager);
    }

    @GetMapping("/managers/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long id) {
        Manager manager = ManagerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id " + id + " is not available.", null));
        return ResponseEntity.ok(manager);
    }

    @PutMapping("/managers/{id}")
    public ResponseEntity<Manager> updateManager(@PathVariable Long id, @RequestBody Manager managerDetails) {
        Manager manager = ManagerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id " + id + " is not available.", null));
        manager.setFirstName(managerDetails.getFirstName());
        manager.setLastName(managerDetails.getLastName());
        manager.setEmailId(managerDetails.getEmailId());

        Manager updatedManager = ManagerRepository.save(manager);

        return ResponseEntity.ok(updatedManager);
    }

    @DeleteMapping ("/managers/{id}")
    String deleteManager(@PathVariable Long id){
        if(!ManagerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id " + id + " is not available.", null);

        } ManagerRepository.deleteById(id);
        return ("Manager id " + id + " has been deleted.");
    }
}
