package com.lawfirm.cms.controller;

import com.lawfirm.cms.entity.Client;
import com.lawfirm.cms.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE') or hasRole('ASSISTANT')")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE') or hasRole('ASSISTANT')")
    public ResponseEntity<Client> getClientById(@PathVariable(value = "id") Long id) {
        Client client = clientService.getClientById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
        return ResponseEntity.ok().body(client);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE')")
    public Client createClient(@Valid @RequestBody Client client) {
        return clientService.createClient(client);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADVOCATE')")
    public ResponseEntity<Client> updateClient(@PathVariable(value = "id") Long id,
                                               @Valid @RequestBody Client clientDetails) {
        Client updatedClient = clientService.updateClient(id, clientDetails);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteClient(@PathVariable(value = "id") Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok().build();
    }
}
