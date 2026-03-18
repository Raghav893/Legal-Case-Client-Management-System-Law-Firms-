package com.raghav.backend.service.impl;

import com.raghav.backend.dto.client.ClientRequest;
import com.raghav.backend.dto.client.ClientResponse;
import com.raghav.backend.entity.Client;
import com.raghav.backend.exception.ResourceNotFoundException;
import com.raghav.backend.repository.ClientRepository;
import com.raghav.backend.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public Page<ClientResponse> getAll(Pageable pageable) {
        return clientRepository.findByDeletedFalse(pageable).map(this::toResponse);
    }

    @Override
    public ClientResponse create(ClientRequest request) {
        Client client = new Client();
        client.setFirstName(request.firstName());
        client.setLastName(request.lastName());
        client.setEmail(request.email());
        client.setPhone(request.phone());
        client.setAddress(request.address());
        Client saved = clientRepository.save(client);
        return toResponse(saved);
    }

    @Override
    public ClientResponse getById(Long id) {
        Client client = clientRepository.findById(id)
                .filter(c -> !c.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        return toResponse(client);
    }

    @Override
    public ClientResponse update(Long id, ClientRequest request) {
        Client client = clientRepository.findById(id)
                .filter(c -> !c.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        client.setFirstName(request.firstName());
        client.setLastName(request.lastName());
        client.setEmail(request.email());
        client.setPhone(request.phone());
        client.setAddress(request.address());
        Client saved = clientRepository.save(client);
        return toResponse(saved);
    }

    @Override
    public void softDelete(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        client.setDeleted(true);
        clientRepository.save(client);
    }

    private ClientResponse toResponse(Client client) {
        return new ClientResponse(
                client.getId(),
                client.getFirstName(),
                client.getLastName(),
                client.getEmail(),
                client.getPhone(),
                client.getAddress(),
                client.getCreatedAt()
        );
    }
}
