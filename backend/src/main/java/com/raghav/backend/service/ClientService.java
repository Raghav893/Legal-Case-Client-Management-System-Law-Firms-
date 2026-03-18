package com.raghav.backend.service;

import com.raghav.backend.dto.client.ClientRequest;
import com.raghav.backend.dto.client.ClientResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClientService {
    Page<ClientResponse> getAll(Pageable pageable);

    ClientResponse create(ClientRequest request);

    ClientResponse getById(Long id);

    ClientResponse update(Long id, ClientRequest request);

    void softDelete(Long id);
}
